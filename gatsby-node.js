const path = require('path')

require('dotenv').config({
   path: `.env.${process.env.NODE_ENV}`
})

module.exports.onCreateNode = ({ node, actions }) => {
   const { createNodeField } = actions

   if (node.internal.type === 'Mdx') {
      const slug = path.basename(node.fileAbsolutePath, '.mdx')

      createNodeField({ node, name: 'slug', value: slug })
   }
}

module.exports.createPages = async ({ graphql, actions }) => {
   const { createPage } = actions
   const blogTemplate = path.resolve('./src/templates/blog/index.jsx')
   const res = await graphql(`
      query {
         allMdx {
            edges {
               node {
                  fields {
                     slug
                  }
               }
            }
         }
      }
   `)

   res.data.allMdx.edges.forEach(edge => {
      createPage({
         component: blogTemplate,
         path: `/blog/${edge.node.fields.slug}`,
         context: {
            slug: edge.node.fields.slug
         }
      })
   })
}
