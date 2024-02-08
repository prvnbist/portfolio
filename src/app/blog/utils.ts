import client from '@/lib/graphql'
import { ARTICLES, ARTICLE_TAGS } from '@/queries'

import { Article, BlogProps } from './types'

export const getTags = async () => {
   const tags: string[] = []

   const { articles = [] } =
      await client.request<Promise<{ articles: Article[] }>>(ARTICLE_TAGS)

   articles.forEach(article => {
      article.tags.forEach(tag => {
         if (!tags.includes(tag)) {
            tags.push(tag)
         }
      })
   })

   return [...new Set(tags)].sort()
}

export const getArticles = async (params: BlogProps['searchParams']) => {
   const search = 's' in params ? params.s ?? '' : ''
   const tags = ['tag' in params ? params.tag ?? '' : ''].filter(Boolean)

   const variables = {
      tags,
      keyword: search.trim(),
   }

   const { articles = [] } = await client.request<
      Promise<{ articles: Article[] }>
   >(ARTICLES, variables)

   return articles
}
