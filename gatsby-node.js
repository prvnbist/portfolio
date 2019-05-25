const path = require('path')
const fetch = require('node-fetch');

require("dotenv").config({
    path: `.env.development`,
  })

const getData = async (url) => await fetch(url).then(res => res.json()).then(data => data);

module.exports.onCreateNode = ({node, actions}) => {
    const {createNodeField} = actions

    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md')

        createNodeField({node, name: 'slug', value: slug})
    }
}

module.exports.createPages = async({graphql, actions}) => {
    const {createPage} = actions
    const blogTemplate = path.resolve('./src/templates/blog.js')
    const res = await graphql(`
        query {
            allMarkdownRemark {
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

    res
        .data
        .allMarkdownRemark
        .edges
        .forEach((edge) => {
            createPage({
                component: blogTemplate,
                path: `/blog/${edge.node.fields.slug}`,
                context: {
                    slug: edge.node.fields.slug
                }
            })
        })

    const shotTemplate = path.resolve('./src/templates/shot.js');
    const URL = `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_TOKEN}`;

    const shots = await getData(URL);
    
    shots.forEach(shot => {
        createPage({component: shotTemplate, path: `/design/${shot.id}`, context: {
                shot
            }})
    })
}