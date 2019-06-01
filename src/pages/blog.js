import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/Layout';

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(sort: {order:DESC, fields: [frontmatter___published] }) {
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
    const meta = {
        title: 'Blog | Praveen Bisht',
        description: 'A list of all of my articles I\'ve written so far.',
        keywords: 'code,design,html,css,animation,user interface, ui to code',
        imgUrl: {
            google: '',
            facebook:'',
            twitter: ''
        },
    }
    return (
        <Layout meta={meta}>
            <div className="container">
                <h4 className="page-heading">Explore Articles</h4>
                <ul id="articles">
                    {data.allMarkdownRemark.edges.map((edge) => {
                        return (
                            <li className="article">
                                <h5>{edge.node.frontmatter.title}</h5>
                                <div className="article-meta">
                                    <Link to={`/blog/${edge.node.fields.slug}`}>Read More</Link>
                                    <span>{edge.node.frontmatter.published}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Layout>
    )
}

export default BlogPage