import fs from 'fs'
import path from 'path'
import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import Head from 'next/head'
import matter from 'gray-matter'
import { useRouter } from 'next/router'

import Layout from '../../sections/Layout'

const seo = {
   thumb: '',
   url: 'https://www.prvnbist.com/blog',
   title: 'Blog | Praveen Bisht | Frontend Engineer',
   description:
      "Sometimes I like to write about what I've learned and you can find them here.",
   keywords:
      'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
}

export default function BLog({ tags, articles = [] }) {
   const router = useRouter()
   const posts = JSON.parse(articles)
   const [search, setSearch] = React.useState('')

   const debouncedSearch = useDebounce(search, 500)

   const onSearch = e => {
      const { value } = e.target
      if (value.length === 0) {
         router.push({
            pathname: '/blog/',
            query: {},
         })
      }
      setSearch(value)
   }

   React.useEffect(() => {
      if (debouncedSearch) {
         router.push({
            pathname: '/blog/',
            query: { text: debouncedSearch },
         })
      }
   }, [debouncedSearch])

   return (
      <Layout>
         <Head>
            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta name="keywords" content={seo.keywords} />
            <meta name="description" content={seo.description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={seo.url} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            {seo.thumb && <meta property="og:image" content={seo.thumb} />}

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={seo.url} />
            <meta property="twitter:title" content={seo.title} />
            <meta property="twitter:description" content={seo.description} />
            {seo.thumb && <meta property="twitter:image" content={seo.thumb} />}
         </Head>
         <div tw="px-4 mt-8 md:px-0 mx-auto max-w-[980px] w-full">
            <input
               type="text"
               value={search}
               placeholder="Search articles..."
               onChange={onSearch}
               tw="rounded-lg w-full px-3 py-2 bg-transparent border border-dark-200 focus:(outline-none border-yellow-400)"
            />
            {tags.length > 0 && (
               <>
                  <section tw="mt-4 mb-2 flex">
                     <h3>Tags</h3>
                     {router.query?.tags && (
                        <button
                           tw="text-gray-400"
                           onClick={() =>
                              router.push({
                                 pathname: '/blog/',
                              })
                           }
                        >
                           &nbsp;(Clear)
                        </button>
                     )}
                  </section>
                  <ul tw="flex flex-wrap gap-2">
                     {tags.map(tag => (
                        <li
                           key={tag}
                           onClick={() =>
                              router.push({
                                 pathname: '/blog/',
                                 query: { tags: tag },
                              })
                           }
                           tw="cursor-pointer inline-flex bg-dark-200 rounded-lg px-2 h-6 text-gray-400"
                        >
                           {tag}
                        </li>
                     ))}
                  </ul>
               </>
            )}
            {Array.isArray(posts) && posts.length > 0 ? (
               <ul tw="rounded-lg mt-4 border border-dark-200 divide-y divide-dark-200">
                  {posts.map(article => (
                     <li key={article.path} tw="h-auto p-4 list-none">
                        <header tw="flex items-center justify-between">
                           <Link href={`/blog/${article.path}`}>
                              <a tw="cursor-pointer text-white text-lg font-medium hover:text-indigo-400">
                                 <h2>{article.meta.title}</h2>
                              </a>
                           </Link>
                           {article.meta.date && (
                              <span tw="flex-shrink-0 text-gray-500 font-medium">
                                 {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                 }).format(new Date(article.meta.date))}
                              </span>
                           )}
                        </header>
                        <ul tw="mt-3 flex flex-wrap gap-2">
                           {article.meta.tags &&
                              article.meta.tags.map(tag => (
                                 <li
                                    key={tag}
                                    onClick={() =>
                                       router.push({
                                          pathname: '/blog/',
                                          query: { tags: tag },
                                       })
                                    }
                                    tw="cursor-pointer bg-dark-200 rounded-lg px-2 h-6 text-gray-400"
                                 >
                                    {tag}
                                 </li>
                              ))}
                        </ul>
                     </li>
                  ))}
               </ul>
            ) : (
               <h4 tw="mt-4 text-3xl text-center">No articles</h4>
            )}
         </div>
      </Layout>
   )
}

const directory = path.join(process.cwd(), 'articles')

export async function getServerSideProps({ query }) {
   const articles = []
   const tags = []
   fs.readdirSync(directory).forEach(async file => {
      if (file.endsWith('.mdx')) {
         const mdx = fs.readFileSync(path.join(directory, file), 'utf8')
         const { data, content } = matter(mdx)
         tags.push(...data.tags)
         if (!query.tags && !query.text) {
            articles.push({
               path: file.replace('.mdx', ''),
               meta: data,
               content,
            })
            return
         }

         if (
            query.text &&
            data.title.toLowerCase().includes(query.text.toLowerCase())
         ) {
            articles.push({
               path: file.replace('.mdx', ''),
               meta: data,
               content,
            })
         } else if (
            query.tags &&
            query.tags.split(',').every(tag => data.tags.includes(tag))
         ) {
            articles.push({
               path: file.replace('.mdx', ''),
               meta: data,
               content,
            })
         }
      }
   })
   return {
      props: {
         tags: [...new Set(tags)].sort(),
         articles: JSON.stringify(
            articles.sort(
               (a, b) => new Date(b.meta.date) - new Date(a.meta.date)
            )
         ),
      },
   }
}

function useDebounce(value, delay) {
   const [debouncedValue, setDebouncedValue] = React.useState(value)
   React.useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value)
      }, delay)
      return () => {
         clearTimeout(handler)
      }
   }, [value, delay])
   return debouncedValue
}
