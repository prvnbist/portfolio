import { createServerFn } from '@tanstack/react-start'

import type { Article, BlogSearch, CmsResult, Design } from './cms.types'

// Server-only modules are imported inside handlers so they never reach the client bundle.
const safely = async <T>(label: string, fn: () => Promise<T>): Promise<CmsResult<T>> => {
	try {
		return { data: await fn(), error: false }
	} catch (err) {
		console.error(`[cms] ${label} failed:`, err instanceof Error ? err.message : err)
		return { data: null, error: true }
	}
}

export const getDesigns = createServerFn({ method: 'GET' }).handler(
	(): Promise<CmsResult<Design[]>> =>
		safely('designs', async () => (await import('./cms.server')).fetchDesigns())
)

export const getBlogIndex = createServerFn({ method: 'GET' })
	.validator((search: BlogSearch) => search)
	.handler(
		(ctx): Promise<CmsResult<{ articles: Article[]; tags: string[] }>> =>
			safely('blog index', async () => {
				const cms = await import('./cms.server')
				const [articles, tags] = await Promise.all([
					cms.fetchArticles(ctx.data),
					cms.fetchTags(),
				])
				return { articles, tags }
			})
	)
