import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../../sections/Layout'

import { PageHeading, Articles, Article } from '../../styles/blog'

const SnippetsPage = () => {
   const {
      allMdx: { edges: articles }
   } = useStaticQuery(graphql`
      query {
         allMdx(
            sort: { order: DESC, fields: frontmatter___date }
            filter: { frontmatter: { type: { eq: "snippet" } } }
         ) {
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
      <Layout
         meta={{
            title: 'Blog | Praveen Bisht | Software Engineer',
            description:
               "Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation. I've experience with both design & development(front-end & back-end).",
            keywords:
               'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
            url: '/blog'
         }}>
         <PageHeading>Snippets</PageHeading>
         <Articles>
            {articles.map(({ node }, index) => {
               return (
                  <Article key={index}>
                     <Link to={`/snippets/${node.fields.slug}`}>
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

export default SnippetsPage
