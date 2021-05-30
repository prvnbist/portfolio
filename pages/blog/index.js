import fs from 'fs'
import path from 'path'
import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import matter from 'gray-matter'

import * as Icon from '../../icons'
import Layout from '../../sections/Layout'

const Blog = ({ tags, articles = [] }) => {
   const buildTagPath = tag => {
      let url = '/blog/?tags='
      if (tags.length > 0) {
         url += tags.join(',')
      }
      if (tags.length > 0 && tags.findIndex(node => node === tag) === -1) {
         url += ','
      }
      if (tags.findIndex(node => node === tag) === -1) {
         url += tag
      }
      return url
   }

   const removedTagPath = tag => {
      const _tags = tags.filter(node => node !== tag)
      return _tags.length > 0 ? `/blog/?tags=${_tags}` : `/blog`
   }

   return (
      <Layout
         meta={{
            title: 'Blog | Praveen Bisht | Software Engineer',
            description:
               "Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation. I've experience with both design & development(front-end & back-end).",
            keywords:
               'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
            url: '/blog',
         }}
      >
         <h1 tw="text-3xl my-6 px-2">Articles</h1>
         <ul tw="flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
               <li
                  key={tag + index}
                  tw="gap-3 flex items-center h-8 px-2 bg-dark-200 rounded text-sm tracking-wider"
               >
                  <span>{tag}</span>
                  <Link href={removedTagPath(tag)}>
                     <a tw="h-5 w-5 rounded-full flex items-center justify-center hover:bg-dark-100 cursor-pointer">
                        <Icon.Close tw="stroke-current" size={16} />
                     </a>
                  </Link>
               </li>
            ))}
         </ul>
         {articles.length === 0 ? (
            <p tw="w-full text-center text-lg">-- No articles --</p>
         ) : (
            <ul tw="divide-y divide-dark-200">
               {articles.map((article, index) => {
                  return (
                     <li key={index} tw="h-auto list-none py-3 px-2">
                        <header tw="flex items-center justify-between mb-3">
                           <Link href={`/blog/${article.path}`}>
                              <a tw="text-lg md:text-xl">{article.title}</a>
                           </Link>
                           <span tw="text-dark-100 text-base md:text-lg">
                              {article.date.slice(0, 10)}
                           </span>
                        </header>
                        <footer>
                           <ul tw="flex flex-wrap items-center gap-2">
                              {article?.tags.map((tag, index) => (
                                 <li
                                    key={tag + index}
                                    tw="px-1 bg-dark-200 rounded text-sm tracking-wider"
                                 >
                                    <Link replace href={buildTagPath(tag)}>
                                       <a>{tag}</a>
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </footer>
                     </li>
                  )
               })}
            </ul>
         )}
      </Layout>
   )
}

export default Blog

export const getServerSideProps = async ({ query }) => {
   let tags = []
   if ('tags' in query && query.tags) {
      tags = query.tags.split(',')
   }
   const files = fs.readdirSync('articles')
   const articles = await Promise.all(
      files
         .map(file => {
            const meta = matter(
               fs.readFileSync(path.join('articles', file), 'utf8')
            ).data
            return {
               path: file.replace('.mdx', ''),
               ...JSON.parse(JSON.stringify(meta)),
            }
         })
         .filter(article => {
            if (
               tags.length > 0 &&
               Array.isArray(article.tags) &&
               article.tags.length > 0
            ) {
               return tags.some(tag => article.tags.includes(tag))
            }
            return true
         })
         .sort((a, b) => new Date(b.date) - new Date(a.date))
   )
   return {
      props: { tags, articles },
   }
}
