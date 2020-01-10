import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/Layout'

const BlogPage = () => {
   const data = useStaticQuery(graphql`
      query {
         allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___published] }
         ) {
            edges {
               node {
                  frontmatter {
                     title
                     published
                  }
                  fields {
                     slug
                  }
               }
            }
         }
      }
   `)
   return (
      <Layout>
         <div>
            <h4>Explore Articles</h4>
            {!data ? (
               <div>Loading...</div>
            ) : (
               <ul>
                  {data.allMarkdownRemark.edges.map((edge, index) => {
                     return (
                        <li key={index}>
                           <h5>{edge.node.frontmatter.title}</h5>
                           <div>
                              <Link to={`/blog/${edge.node.fields.slug}`}>
                                 Read More
                              </Link>
                              <span>{edge.node.frontmatter.published}</span>
                           </div>
                        </li>
                     )
                  })}
               </ul>
            )}
         </div>
      </Layout>
   )
}

export default BlogPage
