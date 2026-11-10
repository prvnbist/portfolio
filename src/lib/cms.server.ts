import { ARTICLES, ARTICLE_TAGS, DESIGNS } from '@/queries'

import { getClient } from './graphql.server'
import type { Article, BlogSearch, Design } from './cms.types'

export const fetchDesigns = async () => {
	const { designs = [] } = await getClient().request<{ designs: Design[] }>(DESIGNS)
	return designs
}

export const fetchTags = async () => {
	const { articles = [] } = await getClient().request<{
		articles: Pick<Article, 'id' | 'tags'>[]
	}>(ARTICLE_TAGS)
	return [...new Set(articles.flatMap(article => article.tags))].sort()
}

export const fetchArticles = async ({ s, tag }: BlogSearch) => {
	const { articles = [] } = await getClient().request<{ articles: Article[] }>(ARTICLES, {
		tags: [tag ?? ''].filter(Boolean),
		keyword: (s ?? '').trim(),
	})
	return articles
}
