module.exports = {
   siteMetadata: {
      title: 'Praveen Bisht',
      author: 'Praveen Bisht',
      description:
         'Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation.',
      siteUrl: 'https://www.prvnbist.com'
   },
   plugins: [
      `gatsby-plugin-styled-components`,
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            name: 'posts',
            path: `${__dirname}/src/posts`
         }
      },
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            name: 'images',
            path: `${__dirname}/src/images`
         }
      },
      `gatsby-plugin-sharp`,
      {
         resolve: `gatsby-plugin-mdx`,
         options: {
            extensions: [`.mdx`, `.md`],
            gatsbyRemarkPlugins: [
               {
                  resolve: `gatsby-remark-images`,
                  options: {
                     maxWidth: 980
                  }
               }
            ]
         }
      },
      `gatsby-plugin-react-helmet`,
      {
         resolve: `gatsby-plugin-feed`,
         options: {
            feeds: [
               {
                  serialize: ({ query: { site, allMdx } }) => {
                     return allMdx.edges.map(edge => {
                        return {
                           ...edge.node.frontmatter,
                           description: edge.node.excerpt,
                           url: `${site.siteMetadata.siteUrl}/blog/${edge.node.fields.slug}`,
                           custom_elements: [
                              { 'content:encoded': edge.node.html }
                           ]
                        }
                     })
                  },
                  query: `
                     {
                        allMdx(
                           limit: 1000,
                           sort: {
                           order: DESC,
                           fields: [frontmatter___date]
                           }
                        ) {
                           edges {
                           node {
                              frontmatter {
                                 title
                                 date
                              }
                              fields {
                                 slug
                              }
                              excerpt
                              html
                           }
                           }
                        }
                     }
                  `,
                  output: `rss.xml`
               }
            ]
         }
      }
   ]
}
