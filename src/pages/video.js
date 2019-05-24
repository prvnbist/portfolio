import React from 'react'

import Layout from '../components/Layout';

export default() => {
    const meta = {
        title: 'Videos | Praveen Bisht',
        description: 'I\'ve been posting a lot o videos some tutorials some timelapse for quite a while now. So here\'s all the videos I\'ve made so far',
        keywords: 'youtube, video, codepen, programming,html,css,javascript,react',
        imgUrl: {
            google: '',
            facebook:'',
            twitter: ''
        },
    }
    return <Layout meta={meta}>
        Videos
    </Layout>

}
