import React from 'react'

import Layout from '../../sections/Layout'

import { TextButton } from '../../components'

import { PageHeading, Projects, Project } from '../../styles/design'

export default () => {
   const [projects] = React.useState([
      {
         title: 'Quick Polls',
         description:
            'A voting application where people can create polls that other people can vote on and share their opinions.',
         url:
            'https://www.figma.com/file/LnRJhWb4uot90YYgVWqQxYCz/Quick-Polls?node-id=0%3A1'
      },
      {
         title: 'Expense App',
         description:
            'Create and manage your expenses with statistics and visualizations to help you in savings.',
         url:
            'https://www.figma.com/file/MXXyWDlL6IGqzXQvZphEipoB/Expense-App?node-id=0%3A1'
      }
   ])
   return (
      <Layout>
         <PageHeading>Designs</PageHeading>
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
                     <a href={project.url}>
                        <TextButton type="outline" typeColor="blue.400">
                           View Project
                        </TextButton>
                     </a>
                  </footer>
               </Project>
            ))}
         </Projects>
      </Layout>
   )
}
