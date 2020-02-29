import React from 'react'

import Layout from '../../sections/Layout'

import { TextButton } from '../../components'

import { PageHeading, Projects, Project } from '../../styles/design'

import expensesImg from '../../images/design/expenses.jpg'
import quickPollsImg from '../../images/design/quick-polls.png'
import propertyImg from '../../images/design/property.png'
import octaneImg from '../../images/design/octane.png'
import samaylaImg from '../../images/design/samayla.png'

export default () => {
   const [projects] = React.useState([
      {
         title: 'Quick Polls',
         description:
            'A voting application where people can create polls that other people can vote on and share their opinions.',
         url:
            'https://www.figma.com/file/LnRJhWb4uot90YYgVWqQxYCz/Quick-Polls?node-id=0%3A1',
         thumb: quickPollsImg
      },
      {
         title: 'Expense App',
         description:
            'Create and manage your expenses with statistics and visualizations to help you in savings.',
         url:
            'https://www.figma.com/file/MXXyWDlL6IGqzXQvZphEipoB/Expense-App?node-id=0%3A1',
         thumb: expensesImg
      },
      {
         title: 'Property App',
         description:
            'A platform of people looking for renting, buying or selling a place. Curates all available homes in a public feed for people to swift through.',
         url:
            'https://www.figma.com/file/V9kIPeesyo8PvF8vmWhkogAX/Property-app?node-id=0%3A1',
         thumb: propertyImg
      },
      {
         title: 'Octane HRMS',
         description:
            'Octane is a comprehensive HR solution based on SAP B1 and powered by Embee. Octane is an HR tool that will enable you to manage your workforce with much more ease and flexibility.',
         url: 'https://www.figma.com/file/NQA1eGIPdhSztZ9kzQLKZifd/Octane',
         thumb: octaneImg
      },
      {
         title: 'Samayla',
         description:
            'SamayLa is a web-based work management and communication system that helps users be more organized and productive. It enables teams and individuals to manage their tasks in a logical structure.',
         url:
            'https://www.figma.com/file/CLwADoW5YMHU184wrLIWWXbI/App-Design?node-id=0%3A1',
         thumb: samaylaImg
      }
   ])
   return (
      <Layout
         meta={{
            title: 'Design | Praveen Bisht | Software Engineer',
            description:
               "Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation. I've experience with both design & development(front-end & back-end).",
            keywords:
               'accessibility, photoshop, typography, web, ux, ui, illustrator, after effects, aesthetics, animation, figma, design, user interface, user experience',
            url: '/design'
         }}>
         <PageHeading>Designs</PageHeading>
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
                     <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={project.title}>
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
