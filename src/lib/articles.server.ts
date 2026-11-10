import matter from 'gray-matter'

import type { ArticleMeta, ArticlePage } from './articles.types'

// Raw MDX sources, read at build time. Only used on the server for frontmatter.
const sources = import.meta.glob('../articles/*.mdx', {
	query: '?raw',
	import: 'default',
	eager: true,
}) as Record<string, string>

const slugOf = (file: string) => file.replace(/^.*\//, '').replace(/\.mdx$/, '')

const toMeta = (slug: string, data: Record<string, any>): ArticleMeta => ({
	slug,
	title: String(data.title ?? slug),
	date: data.date ? new Date(data.date).toISOString() : null,
	tags: Array.isArray(data.tags) ? data.tags : [],
	description: data.description ?? null,
	ogImage: data.ogImage ?? null,
})

const all = Object.entries(sources)
	.map(([file, raw]) => toMeta(slugOf(file), matter(raw).data))
	.sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime())

export const listSlugs = () => all.map(a => a.slug)

export const fetchArticlePage = (slug: string): ArticlePage | null => {
	const index = all.findIndex(a => a.slug === slug)
	if (index === -1) return null
	return {
		meta: all[index],
		previous: index > 0 ? all[index - 1] : null,
		next: index < all.length - 1 ? all[index + 1] : null,
	}
}
