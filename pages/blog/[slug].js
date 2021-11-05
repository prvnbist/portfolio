import fs from 'fs'
import path from 'path'
import tw from 'twin.macro'
import Head from 'next/head'
import Link from 'next/link'
import matter from 'gray-matter'
import router from 'next/router'
import MDX from '@mdx-js/runtime'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../../sections/Layout'
import { CodeBlock } from '../../components/code'

export default function Article({ article }) {
   const post = JSON.parse(article)
   return (
      <Layout>
         <Head>
            <title>{post.meta.title} | Praveen Bisht</title>
            <meta name="title" content={post.meta.title} />
            <meta name="keywords" content={post.meta.tags.join(', ')} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={post.slug} />
            <meta property="og:title" content={post.meta.title} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={post.slug} />
            <meta property="twitter:title" content={post.meta.title} />
         </Head>
         <div
            tw="p-4 md:py-4 m-auto"
            style={{ maxWidth: '980px', width: '100%' }}
         >
            <header tw="p-8 bg-dark-300 rounded-lg">
               <h1 tw="text-3xl md:text-4xl mb-2">{post.meta.title}</h1>
               {post.meta.date && (
                  <span tw="text-lg text-gray-400">
                     {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                     }).format(new Date(post.meta.date))}
                  </span>
               )}
               <ul tw="mt-3 flex flex-wrap gap-2">
                  {post.meta.tags &&
                     post.meta.tags.map(tag => (
                        <li
                           key={tag}
                           onClick={() =>
                              router.push({
                                 pathname: '/blog/',
                                 query: { tags: tag },
                              })
                           }
                           tw="cursor-pointer bg-gray-700 rounded-lg px-2 h-6 text-gray-400"
                        >
                           {tag}
                        </li>
                     ))}
               </ul>
            </header>
            <main tw="mt-6" id="article">
               <MDXProvider components={components}>
                  <MDX>{post.content}</MDX>
               </MDXProvider>
            </main>
            <footer tw="mt-4 flex flex-col md:flex-row gap-3">
               {post.previous ? (
                  <Link href={`/blog/${post.previous.slug}`}>
                     <a tw="cursor-pointer flex items-center justify-between flex-1 border border-solid border-gray-700 p-4 rounded-lg hover:bg-[#202024]">
                        <span tw="">
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
                        <span>{post.previous.title}</span>
                     </a>
                  </Link>
               ) : (
                  <span tw="flex-1" />
               )}
               {post.next ? (
                  <Link href={`/blog/${post.next.slug}`}>
                     <a tw="cursor-pointer flex items-center justify-between flex-1 border border-solid border-gray-700 p-4 rounded-lg hover:bg-[#202024]">
                        <span>{post.next.title}</span>
                        <span tw="">
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
                     </a>
                  </Link>
               ) : (
                  <span tw="flex-1" />
               )}
            </footer>
         </div>
      </Layout>
   )
}

const components = {
   code: CodeBlock,
   h1: props => (
      <h1 {...props} tw="border-b border-gray-800 pb-3 text-4xl mt-5 mb-3" />
   ),
   h2: props => (
      <h2 {...props} tw="border-b border-gray-800 pb-3 text-3xl mt-5 mb-3" />
   ),
   h3: props => (
      <h3 {...props} tw="border-b border-gray-800 pb-3 text-2xl mt-5 mb-2" />
   ),
   h4: props => (
      <h4 {...props} tw="border-b border-gray-800 pb-3 text-xl mt-5 mb-2" />
   ),
   blockquote: props => (
      <blockquote {...props} tw="border-l-4 border-gray-700 pl-3" />
   ),
   inlineCode: props => (
      <code
         {...props}
         tw="inline-block text-gray-400 text-sm bg-gray-800 px-2 rounded"
      />
   ),
   a: props => <a {...props} tw="text-blue-500 hover:text-blue-700" />,
   table: props => <table {...props} tw="table my-3 w-full border-collapse" />,
   p: props => <p {...props} tw="text-gray-400 mb-3 text-lg" />,
   tbody: props => <tbody {...props} tw="border-t border-gray-700" />,
   thead: props => <thead {...props} tw="h-8 border-gray-700" />,
   th: props => <th {...props} tw="px-3 border-gray-700" />,
   tr: props => <tr {...props} tw="h-10 px-3 border-gray-700" />,
   td: props => <td {...props} tw="my-4 overflow-hidden rounded" />,
   img: props => (
      <div>
         <img {...props} alt={props.alt} tw="rounded-md w-full object-cover" />
      </div>
   ),
   ul: props => <ul {...props} tw="list-disc pl-6" />,
   li: props => <li {...props} tw="text-gray-400 my-1 text-lg" />,
   ol: props => <ol {...props} tw="list-decimal pl-4" />,
}

const directory = path.join(process.cwd(), 'articles')

export async function getStaticPaths() {
   const paths = []
   fs.readdirSync(directory).forEach(async file => {
      if (file.endsWith('.mdx')) {
         paths.push({ params: { slug: file.replace('.mdx', '') } })
      }
   })
   return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
   const { slug } = params

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

   articles = articles.sort((a, b) => new Date(b.date) - new Date(a.date))

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
      props: {
         article: JSON.stringify({ slug, meta, content, previous, next }),
      },
   }
}
