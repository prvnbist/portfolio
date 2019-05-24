import React from 'react'
import {graphql} from 'gatsby'

import Layout from '../components/Layout';

export const query = graphql `
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`

const Blog = (props) => {
    const meta = {
        title: `${props.data.markdownRemark.frontmatter.title} | Praveen Bisht`,
        description: '',
        keywords: '',
        imgUrl: {
            google: '',
            facebook: '',
            twitter: ''
        }
    }
    return (
        <Layout meta={meta}>
            <h1>{props.data.markdownRemark.frontmatter.title}</h1>
            <p>{props.data.markdownRemark.frontmatter.date}</p>
            <div
                dangerouslySetInnerHTML={{
                __html: props.data.markdownRemark.html
            }}></div>
        </Layout>
    )
}

export default Blog