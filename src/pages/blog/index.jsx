import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../../sections/Layout'

import { PageHeading, Articles, Article } from '../../styles/blog'

const BlogPage = () => {
   const {
      allMdx: { edges: articles }
   } = useStaticQuery(graphql`
      query {
         allMdx(sort: { order: DESC, fields: frontmatter___date }) {
            edges {
               node {
                  fields {
                     slug
                  }
                  frontmatter {
                     title
                     date(formatString: "MMM DD, YYYY")
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
                        <span>{node.frontmatter.date}</span>
                     </Link>
                  </Article>
               )
            })}
         </Articles>
      </Layout>
   )
}

export default BlogPage
