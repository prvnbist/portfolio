import { createServerFn } from '@tanstack/react-start'
import { type ComponentType, type LazyExoticComponent, lazy } from 'react'

import type { ArticlePage } from './articles.types'

export const getArticlePage = createServerFn({ method: 'GET' })
	.validator((slug: string) => slug)
	.handler(async (ctx): Promise<ArticlePage | null> => {
		const { fetchArticlePage } = await import('./articles.server')
		return fetchArticlePage(ctx.data)
	})

type MdxComponent = ComponentType<{ components?: Record<string, any> }>

// MDX is compiled at build time by @mdx-js/rollup; nothing is compiled at runtime.
const modules = import.meta.glob<{ default: MdxComponent }>('../articles/*.mdx')

const lazyComponents = new Map<string, LazyExoticComponent<MdxComponent>>()

const key = (slug: string) => `../articles/${slug}.mdx`

/** Warms the module cache so navigation doesn't flash a fallback. */
export const preloadArticle = async (slug: string) => {
	const load = modules[key(slug)]
	if (!load) return false
	await load()
	return true
}

/**
 * Lazy component per article. React.lazy lets hydration suspend until the chunk is loaded on the
 * client (the loader does not re-run during hydration), avoiding a server/client mismatch.
 */
export const getArticleComponent = (slug: string) => {
	const load = modules[key(slug)]
	if (!load) return undefined
	let component = lazyComponents.get(slug)
	if (!component) {
		component = lazy(load)
		lazyComponents.set(slug, component)
	}
	return component
}
