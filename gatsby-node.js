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
         allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
               node {
                  fields {
                     slug
                  }
                  frontmatter {
                     type
                     title
                  }
               }
            }
         }
      }
   `)
   const posts = res.data.allMdx.edges
   posts.forEach(({ node }, index) => {
      const { type } = node.frontmatter
      const path = `/${type === 'article' ? 'blog' : 'snippets'}/${
         node.fields.slug
      }`
      createPage({
         path,
         component: blogTemplate,
         context: {
            slug: node.fields.slug,
            prev: index === 0 ? null : posts[index - 1].node,
            next: index === posts.length - 1 ? null : posts[index + 1].node
         }
      })
   })
}
