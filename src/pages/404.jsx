import React from 'react'
import { Link } from 'gatsby'

import Layout from '../sections/Layout'

const NotFound = () => {
   return (
      <Layout
         meta={{
            title: 'Praveen Bisht | Software Engineer',
            description:
               "Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation. I've experience with both design & development(front-end & back-end).",
            keywords:
               'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience'
         }}>
         <h2 style={{ fontWeight: 400, lineHeight: '48px', marginTop: '48px' }}>
            Looks like you're lost! No worries, I'll help go back safely! Here's{' '}
            <Link to="/">home</Link>
         </h2>
      </Layout>
   )
}

export default NotFound
