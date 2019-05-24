import React from 'react'

import Layout from '../components/Layout';

export default() => {
    const meta = {
        title: 'Code | Praveen Bisht',
        description: 'View all of my code demos and projects in one place.',
        keywords: 'code, app, website,codepen, github, projects, demos, interaction, animation, html, css, javascript, react, jquery, express, mongodb, graphql',
        imgUrl: {
            google: '',
            facebook:'',
            twitter: ''
        },
    }
    return <Layout meta={meta}>
        Code
    </Layout>

}
