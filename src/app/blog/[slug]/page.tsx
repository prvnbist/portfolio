import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import { Suspense } from 'react'

import type { Metadata } from 'next'

import Content from './Content'

type ArticleProps = {
   params: { slug: string }
}

const directory = path.join(process.cwd(), 'src/articles')

export async function generateMetadata({
   params,
}: ArticleProps): Promise<Metadata> {
   const slug = params.slug

   const mdx = await fs.readFileSync(
      path.join(directory, slug + '.mdx'),
      'utf8'
   )
   const { data: meta } = matter(mdx)

   const title = `${meta.title} | Praveen Bisht`

   return {
      title: title,
      description: meta.description,
      keywords: meta.tags,
      metadataBase: new URL('https://www.prvnbist.com'),
      openGraph: {
         type: 'website',
         url: `/blog/${slug}`,
         title: title,
         description: meta.description,
      },
      twitter: {
         card: 'summary_large_image',
         site: '@prvnbist',
         title: title,
         description: meta.description,
      },
   }
}

export default async function Article({ params }: ArticleProps) {
   const article = await getArticle(params.slug)
   return (
      <Suspense fallback={'Loading...'}>
         <header className="mb-4 p-8 bg-dark-300 rounded-lg">
            <h1 className="text-3xl md:text-4xl mb-2">{article.meta.title}</h1>
            {article.meta.date && (
               <span className="text-lg text-gray-400">
                  {new Intl.DateTimeFormat('en-US', {
                     year: 'numeric',
                     month: 'short',
                     day: 'numeric',
                  }).format(new Date(article.meta.date))}
               </span>
            )}
            <ul className="mt-3 flex flex-wrap gap-2">
               {article.meta.tags &&
                  article.meta.tags.map((tag: string) => (
                     <li
                        key={tag}
                        className="font-light text-sm inline-flex bg-dark-200 rounded-full px-2 py-[2px] text-gray-400"
                     >
                        {tag}
                     </li>
                  ))}
            </ul>
         </header>
         <Content content={article.content} />
         <footer className="mt-4 flex flex-col md:flex-row gap-3">
            {article.previous ? (
               <Link
                  href={`/blog/${article.previous.slug}`}
                  className="cursor-pointer flex items-center justify-between flex-1 border border-solid border-gray-700 p-4 rounded-lg hover:bg-[#202024]"
               >
                  <ArrowLeft />
                  <span className="text-white">{article.previous.title}</span>
               </Link>
            ) : (
               <span className="flex-1" />
            )}
            {article.next ? (
               <Link
                  href={`/blog/${article.next.slug}`}
                  className="cursor-pointer flex items-center justify-between flex-1 border border-solid border-gray-700 p-4 rounded-lg hover:bg-[#202024]"
               >
                  <span className="text-white">{article.next.title}</span>
                  <ArrowRight />
               </Link>
            ) : (
               <span className="flex-1" />
            )}
         </footer>
      </Suspense>
   )
}

export async function generateStaticParams() {
   const paths: Array<{ slug: string }> = []
   fs.readdirSync(directory).forEach(async file => {
      if (file.endsWith('.mdx')) {
         paths.push({ slug: file.replace('.mdx', '') })
      }
   })
   return paths
}

const getArticle = async (slug: string) => {
   const files = await fs.readdirSync(directory)

   let articles = await Promise.all(
      files.map(async file => {
         const mdx = await fs.readFileSync(path.join(directory, file), 'utf8')
         const { data: meta } = matter(mdx)
         return {
            title: meta.title,
            date: meta.date,
            slug: file.replace('.mdx', ''),
         }
      })
   )

   articles = articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
   )

   const mdx = await fs.readFileSync(
      path.join(directory, slug + '.mdx'),
      'utf8'
   )
   const { data: meta, content } = matter(mdx)

   const articleIndex = articles.findIndex(article => article.slug === slug)

   const previous = articleIndex > 0 ? articles[articleIndex - 1] : null
   const next =
      articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null

   return {
      slug,
      meta,
      content,
      previous,
      next,
   }
}

const ArrowRight = () => (
   <span>
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="18"
         height="18"
         viewBox="0 0 24 24"
         fill="none"
         stroke="#ffffff"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M5 12h13M12 5l7 7-7 7" />
      </svg>
   </span>
)

const ArrowLeft = () => (
   <span>
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="18"
         height="18"
         viewBox="0 0 24 24"
         fill="none"
         stroke="#ffffff"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M19 12H6M12 5l-7 7 7 7" />
      </svg>
   </span>
)
