import React from 'react'

import Layout from '../../sections/Layout'

import { TextButton } from '../../components'

import { PageHeading, Projects, Project } from '../../styles/code'

import expensesImg from '../../images/design/expenses.jpg'
import transcodeImg from '../../images/code/transcode.png'
import snippifyImg from '../../images/code/snippify.png'
import karyaImg from '../../images/code/karya.png'
import recipeImg from '../../images/code/recipe.png'
import expensesAppImg from '../../images/code/expenses.png'

export default () => {
   const [projects] = React.useState([
      {
         title: 'Expenses App',
         description: 'A self-hosted app to manage your expenses/earnings.',
         code: 'https://github.com/prvnbist/expenses',
         thumb: expensesAppImg
      },
      {
         title: 'Transcode',
         description:
            'A platform hosting collection of tools for textual transformation.',
         demo: 'https://transcode.prvnbist.com/',
         code: 'https://github.com/prvnbist/transcode',
         thumb: transcodeImg
      },
      {
         title: 'Snippify',
         description:
            'A snippet management app built with monaco text editor and supports over 30 languages with syntax highlighting.',
         code: 'https://github.com/prvnbist/snippify',
         thumb: snippifyImg
      },
      {
         title: 'Karya',
         description:
            'A simple todo application to manage your tasks and categorize them by using labels.',
         code: 'https://github.com/prvnbist/karya',
         thumb: karyaImg
      },
      {
         title: 'Expenses',
         description:
            'A platform to empower you in managing expenses packed with analytics for your expenses.',
         code: 'https://github.com/prvnbist/expense-app-frontend',
         demo: 'https://expense-app.netlify.com/',
         thumb: expensesImg
      },
      {
         title: 'Recipe',
         description: 'A simple recipe for recipe management in one place',
         code: 'https://codesandbox.io/s/recipe-app-reactredux-z7ngi',
         demo: 'https://z7ngi.codesandbox.io/',
         thumb: recipeImg
      }
   ])
   return (
      <Layout
         meta={{
            title: 'Code | Praveen Bisht | Software Engineer',
            description:
               "Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation. I've experience with both design & development(front-end & back-end).",
            keywords:
               'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
            url: '/code'
         }}>
         <PageHeading>Code</PageHeading>
         <Projects>
            {projects.map(project => (
               <Project key={project.url}>
                  <header>
                     <div>
                        <img src={project.thumb} alt={project.title} />
                     </div>
                     <h3>{project.title}</h3>
                  </header>
                  <main>
                     <p>{project.description}</p>
                  </main>
                  <footer>
                     {project.code && (
                        <a
                           href={project.code}
                           target="_blank"
                           rel="noopener noreferrer"
                           title={project.title}>
                           <TextButton type="solid" typeColor="blue.400">
                              Code
                           </TextButton>
                        </a>
                     )}
                     {project.demo && (
                        <a
                           href={project.demo}
                           target="_blank"
                           rel="noopener noreferrer"
                           title={project.title}>
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
