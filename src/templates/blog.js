import React from 'react'
import {graphql, Link} from 'gatsby'

import Layout from '../components/Layout';

export const query = graphql `
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        published
        updated
        tags
      }
      fields {
        slug
      }
      timeToRead
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
            <div id="article__header">
                <div className="container">
                    <Link to='/blog' className="btn btn-outline-white" id="back">Back</Link>
                    <h3 id="article__title">{props.data.markdownRemark.frontmatter.title}</h3>
                    <ul id="article__tags">
                        {props
                            .data
                            .markdownRemark
                            .frontmatter
                            .tags
                            .split(',')
                            .map(tag => <li key={tag}>{tag}</li>)
}
                    </ul>
                    <div id="article__meta">
                        <span>{props.data.markdownRemark.frontmatter.published}</span>
                        <span>{props.data.markdownRemark.timeToRead}
                            mins read</span>
                    </div>
                </div>
            </div>
            <div className="container">
                <div
                    className="blog-container"
                    id="article__content"
                    dangerouslySetInnerHTML={{
                    __html: props.data.markdownRemark.html
                }}></div>
                <div id="article__footer">
                    <div id="tags">
                        <h5 className="caps__heading">Tags</h5>
                        <ul>
                            {props.data.markdownRemark.frontmatter.tags.split(',').map((tag, index) => <li key={index} className='tag'>{tag}</li>)
}
                        </ul>
                    </div>
					{/* <div id="article__share">
                        <h5 className="caps__heading">Share</h5>
                        <ul id="article__share__medium">
                            <li className="tag">Facebook</li>
                            <li className="tag">Twitter</li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </Layout>
    )
}

export default Blog