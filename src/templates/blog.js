import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'

export const query = graphql`
   query($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
         frontmatter {
            title
            published
            updated
            tags
         }
         fields {
            slug
         }
         timeToRead
         html
      }
   }
`

const Blog = props => {
   return (
      <Layout>
         <div>
            <div>
               <Link to="/blog">Back</Link>
               <h3>{props.data.markdownRemark.frontmatter.title}</h3>
               <ul>
                  {props.data.markdownRemark.frontmatter.tags
                     .split(',')
                     .map(tag => (
                        <li key={tag}>{tag}</li>
                     ))}
               </ul>
               <div>
                  <span>{props.data.markdownRemark.frontmatter.published}</span>
                  <span>
                     {props.data.markdownRemark.timeToRead}
                     mins read
                  </span>
               </div>
            </div>
         </div>
         <div>
            <div
               dangerouslySetInnerHTML={{
                  __html: props.data.markdownRemark.html
               }}></div>
            <div>
               <div>
                  <h5>Tags</h5>
                  <ul>
                     {props.data.markdownRemark.frontmatter.tags
                        .split(',')
                        .map((tag, index) => (
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
