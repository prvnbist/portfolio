import React from 'react'

import Layout from '../../sections/Layout'

import { TextButton } from '../../components'

import { PageHeading, Projects, Project } from '../../styles/code'

export default () => {
   const [projects] = React.useState([
      {
         title: 'Transcode',
         description:
            'A platform hosting collection of tools for textual transformation.',
         demo: 'https://transcode.prvnbist.com/',
         code: 'https://github.com/prvnbist/transcode'
      },
      {
         title: 'Snippify',
         description:
            'A snippet management app built with monaco text editor and supports over 30 languages with syntax highlighting.',
         code: 'https://github.com/prvnbist/snippify'
      },
      {
         title: 'Karya',
         description:
            'A simple todo application to manage your tasks and categorize them by using labels.',
         code: 'https://github.com/prvnbist/karya'
      },
      {
         title: 'Expenses',
         description:
            'A platform to empower you in managing expenses packed with analytics for your expenses.',
         code: 'https://github.com/prvnbist/expense-app-frontend',
         demo: 'https://expense-app.netlify.com/'
      },
      {
         title: 'Recipe',
         description: 'A simple recipe for recipe management in one place',
         code: 'https://codesandbox.io/s/recipe-app-reactredux-z7ngi',
         demo: 'https://z7ngi.codesandbox.io/'
      }
   ])
   return (
      <Layout>
         <PageHeading>Code</PageHeading>
         <Projects>
            {projects.map(project => (
               <Project key={project.url}>
                  <header>
                     <h3>{project.title}</h3>
                  </header>
                  <main>
                     <p>{project.description}</p>
                  </main>
                  <footer>
                     {project.code && (
                        <a href={project.code}>
                           <TextButton type="solid" typeColor="blue.400">
                              Code
                           </TextButton>
                        </a>
                     )}
                     {project.demo && (
                        <a href={project.demo}>
                           <TextButton type="outline" typeColor="dark.200">
                              Demo
                           </TextButton>
                        </a>
                     )}
                  </footer>
               </Project>
            ))}
         </Projects>
      </Layout>
   )
}
