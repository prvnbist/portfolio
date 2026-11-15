/// <reference types="vitest/config" />
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxCodeMeta from 'remark-mdx-code-meta'
import { defineConfig, type Plugin } from 'vite'

// Compile .mdx imports at build time, but leave `?raw` (and other query) imports untouched
// so frontmatter can be read from the source text.
const mdxPlugin = (): Plugin => {
	const plugin = mdx({
		remarkPlugins: [remarkFrontmatter, remarkMdxCodeMeta] as any,
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

// Under Vitest, skip the Start/Nitro app plugins; the MDX and glob handling is all tests need.
const isTest = !!process.env.VITEST

export default defineConfig({
	server: { port: 3000 },
	resolve: { tsconfigPaths: true },
	plugins: [
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
