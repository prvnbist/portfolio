import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../../sections/Layout'

import { TextButton, CodeBlock } from '../../components'

import { Header, Body } from './styles'

export const query = graphql`
   query($slug: String!) {
      mdx(fields: { slug: { eq: $slug } }) {
         frontmatter {
            title
            tags
            date(formatString: "MMM DD, YYYY")
         }
         timeToRead
         body
      }
   }
`

const Blog = props => {
   const post = props.data.mdx
   return (
      <Layout>
         <Link to="/blog">
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
                  pre: props => <CodeBlock {...props.children.props} />
               }}>
               <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
         </Body>
      </Layout>
   )
}

export default Blog
