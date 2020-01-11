import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../../sections/Layout'

export const query = graphql`
   query($slug: String!) {
      mdx(fields: { slug: { eq: $slug } }) {
         frontmatter {
            title
            tags
            published
         }
         body
      }
   }
`

const Blog = props => {
   const post = props.data.mdx
   return (
      <Layout>
         <div>
            <div>
               <Link to="/blog">Back</Link>
               <h3>{post.frontmatter.title}</h3>
               <ul>
                  {post.frontmatter.tags.map(tag => (
                     <li key={tag}>{tag}</li>
                  ))}
               </ul>
               <div>
                  <span>{post.frontmatter.published}</span>
                  <span>
                     {post.timeToRead}
                     mins read
                  </span>
               </div>
            </div>
         </div>
         <div>
            <MDXRenderer>{post.body}</MDXRenderer>
            <div>
               <div>
                  <h5>Tags</h5>
                  <ul>
                     {post.frontmatter.tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default Blog
