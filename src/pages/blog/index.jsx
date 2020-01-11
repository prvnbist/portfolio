import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../../sections/Layout'

import { PageHeading, Articles, Article } from './styles'

const BlogPage = () => {
   const {
      allMdx: { edges: articles }
   } = useStaticQuery(graphql`
      query {
         allMdx(sort: { order: ASC, fields: frontmatter___published }) {
            edges {
               node {
                  fields {
                     slug
                  }
                  frontmatter {
                     title
                     published
                  }
               }
            }
         }
      }
   `)
   return (
      <Layout>
         <PageHeading>Articles</PageHeading>
         <Articles>
            {articles.map(({ node }, index) => {
               return (
                  <Article key={index}>
                     <Link to={`/blog/${node.fields.slug}`}>
                        <h4>{node.frontmatter.title}</h4>
                        <span>{node.frontmatter.published}</span>
                     </Link>
                  </Article>
               )
            })}
         </Articles>
      </Layout>
   )
}

export default BlogPage
