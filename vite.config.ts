/// <reference types="vitest/config" />
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxCodeMeta from 'remark-mdx-code-meta'
import matter from 'gray-matter'
import { defineConfig, type Plugin } from 'vite'

import { checkFrontmatter } from './src/lib/frontmatter'
import { rehypeImageSize } from './src/lib/rehype-image-size'

// Compile .mdx imports at build time, but leave `?raw` (and other query) imports untouched
// so frontmatter can be read from the source text.
const mdxPlugin = (): Plugin => {
	const plugin = mdx({
		remarkPlugins: [remarkFrontmatter, remarkMdxCodeMeta] as any,
		rehypePlugins: [
			[rehypeImageSize, { publicDir: fileURLToPath(new URL('./public', import.meta.url)) }],
		] as any,
	}) as Plugin & { transform: (this: any, code: string, id: string) => any }
	const transform = plugin.transform
	return {
		...plugin,
		enforce: 'pre',
		transform(code, id) {
			if (id.includes('?')) return null
			return transform.call(this, code, id)
		},
	}
}

// Fail `vite build` / `vite dev` early, naming the article, when frontmatter is incomplete.
const checkArticles = (): Plugin => ({
	name: 'check-article-frontmatter',
	buildStart() {
		const dir = new URL('./src/articles/', import.meta.url)
		for (const file of readdirSync(dir).filter(f => f.endsWith('.mdx'))) {
			const raw = readFileSync(new URL(file, dir), 'utf8')
			checkFrontmatter(file.replace(/\.mdx$/, ''), matter(raw).data)
		}
	},
})

// Under Vitest, skip the Start/Nitro app plugins; the MDX and glob handling is all tests need.
const isTest = !!process.env.VITEST

export default defineConfig({
	server: { port: 3000 },
	resolve: { tsconfigPaths: true },
	plugins: [
		checkArticles(),
		tailwindcss(),
		mdxPlugin(),
		// tanstackStart must come before the React plugin
		!isTest && tanstackStart(),
		!isTest && nitro(),
		viteReact(),
	],
	test: {
		include: ['src/**/*.test.{ts,tsx}'],
		environment: 'node',
	},
})
