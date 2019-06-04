const path = require('path')
const fetch = require('node-fetch');

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })

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
    
    const getData = async (url) => {
        const fetchIt = await fetch(url);
        const data = await fetchIt.json();
        return data;
    };

    const URL = `https://api.dribbble.com/v2/user/shots?access_token=${process.env.GATSBY_DRIBBBLE_TOKEN}`;
    const shots = await getData(URL);
    try {
        shots.map(shot => {
            createPage({component: shotTemplate, path: `/design/${shot.id}`, context: {
                    shot
                }})
        })
    }
    catch(err) {
        console.log(err);
    }
}