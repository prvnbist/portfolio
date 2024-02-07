import Link from 'next/link'
import { Metadata } from 'next'

import client from '@/lib/graphql'
import { ARTICLES, ARTICLE_TAGS } from '@/queries'

import Tags from './Tags'
import Search from './Search'

const seo = {
   thumb: '',
   url: 'https://www.prvnbist.com/blog',
   title: 'Blog | Praveen Bisht | Frontend Engineer',
   description:
      "Sometimes I like to write about what I've learned and you can find them here.",
   keywords:
      'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
}

export const metadata: Metadata = {
   title: seo.title,
   description: seo.description,
   keywords: seo.keywords,
   applicationName: seo.title,
   metadataBase: new URL(seo.url),
   openGraph: {
      type: 'website',
      url: seo.url,
      title: seo.title,
      description: seo.description,
      images: seo.thumb,
   },
   twitter: {
      card: 'summary_large_image',
      site: '@prvnbist',
      title: seo.title,
      description: seo.description,
      images: seo.thumb,
   },
}

type Article = {
   id: string
   title: string
   date: string
   path: string
   tags: string[]
}

type BlogProps = {
   searchParams: { [key: string]: string }
}

const getTags = async () => {
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

const getArticles = async (params: BlogProps['searchParams']) => {
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

export default async function Blog({ searchParams }: BlogProps) {
   const tags = await getTags()
   const articles = await getArticles(searchParams)
   return (
      <div className="px-4 mt-8 md:px-0 mx-auto max-w-[980px] w-full">
         <Search />
         <Tags tags={tags} />
         {Array.isArray(articles) && articles.length > 0 ? (
            <ul className="rounded-lg mt-4 border border-dark-200 divide-y divide-dark-200">
               {articles.map(article => (
                  <li key={article.id} className="h-auto p-4 list-none">
                     <header className="flex items-center justify-between">
                        <Link
                           href={`/blog/${article.path}`}
                           className="cursor-pointer text-white text-lg font-medium hover:text-indigo-400"
                        >
                           <h2>{article.title}</h2>
                        </Link>
                        {article.date && (
                           <span className="flex-shrink-0 text-gray-500 font-medium">
                              {new Intl.DateTimeFormat('en-US', {
                                 year: 'numeric',
                                 month: 'short',
                                 day: 'numeric',
                              }).format(new Date(article.date))}
                           </span>
                        )}
                     </header>
                  </li>
               ))}
            </ul>
         ) : (
            <h4 className="mt-4 text-3xl text-center">No articles</h4>
         )}
      </div>
   )
}
