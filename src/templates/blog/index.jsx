import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../../sections/Layout'

import { TextButton, CodeBlock } from '../../components'

import { Header, Body, Pagination } from './styles'

export const query = graphql`
   query($slug: String!) {
      mdx(fields: { slug: { eq: $slug } }) {
         frontmatter {
            type
            tags
            title
            date(formatString: "MMM DD, YYYY")
            headerImage {
               publicURL
            }
         }
         timeToRead
         body
         excerpt
         fields {
            slug
         }
      }
   }
`

const Blog = ({ data, pageContext }) => {
   const post = data.mdx
   const base = post.frontmatter.type === 'article' ? 'blog' : 'snippets'
   const next = () => {
      if (pageContext.next.frontmatter.type === 'article') {
         return pageContext.next
            ? {
                 url: `/blog/${pageContext.next.fields.slug}`,
                 title: pageContext.next.frontmatter.title
              }
            : null
      }
      return null
   }
   const prev = () => {
      if (pageContext.prev.frontmatter.type === 'article') {
         return pageContext.prev
            ? {
                 url: `/blog/${pageContext.prev.fields.slug}`,
                 title: pageContext.prev.frontmatter.title
              }
            : null
      }
      return null
   }
   return (
      <Layout
         meta={{
            title: post.frontmatter.title,
            description: post.excerpt,
            keywords: post.frontmatter.tags,
            url: `/${base}/${post.fields.slug}`,
            image: post?.frontmatter?.headerImage?.publicURL
         }}>
         <Link to={`/${base}`}>
            <TextButton
               type="outline"
               typeColor="dark.200"
               style={{ marginTop: '24px' }}>
               Back
            </TextButton>
         </Link>
         <Header>
            <h1>{post.frontmatter.title}</h1>
            <div>
               <span>{post.frontmatter.date}</span>
               <span>
                  {post.timeToRead}
                  mins read
               </span>
            </div>
         </Header>
         <Body>
            <MDXProvider
               components={{
                  a: props => (
                     <a
                        href={props.href}
                        title={props.title}
                        target="_blank"
                        rel="noopener noreferrer">
                        {props.children}
                     </a>
                  ),
                  pre: props => <CodeBlock {...props.children.props} />
               }}>
               <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
         </Body>
         {post.frontmatter.type === 'article' && (
            <Pagination>
               {prev() && (
                  <Link to={prev().url}>
                     <span>Previous</span>
                     <h3>{prev().title}</h3>
                  </Link>
               )}
               {next() && (
                  <Link to={next().url}>
                     <span>Next</span>
                     <h3>{next().title}</h3>
                  </Link>
               )}
            </Pagination>
         )}
      </Layout>
   )
}

export default Blog
