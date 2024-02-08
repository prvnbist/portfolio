import { Metadata } from 'next'
import { Suspense } from 'react'

import Tags from './Tags'
import Search from './Search'

import { BlogProps } from './types'
import { getArticles, getTags } from './utils'
import { Articles, Loader } from './components'

const seo = {
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
   },
   twitter: {
      card: 'summary_large_image',
      site: '@prvnbist',
      title: seo.title,
      description: seo.description,
   },
}

export default async function Blog({ searchParams }: BlogProps) {
   const tags = await getTags()
   const articles = await getArticles(searchParams)
   return (
      <div className="px-4 mt-8 md:px-0 mx-auto max-w-[980px] w-full">
         <Suspense fallback={<Loader />}>
            <Search />
            <Tags tags={tags} />
         </Suspense>
         <Articles articles={articles} />
      </div>
   )
}
