import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../../sections/Layout'

import { PageHeading, Articles, Article } from './styles'

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
         <PageHeading>Articles</PageHeading>
         {!data ? (
            <div>Loading...</div>
         ) : (
            <Articles>
               {data.allMarkdownRemark.edges.map((edge, index) => {
                  return (
                     <Article key={index}>
                        <Link to={`/blog/${edge.node.fields.slug}`}>
                           <h4>{edge.node.frontmatter.title}</h4>
                           <span>{edge.node.frontmatter.published}</span>
                        </Link>
                     </Article>
                  )
               })}
            </Articles>
         )}
      </Layout>
   )
}

export default BlogPage
