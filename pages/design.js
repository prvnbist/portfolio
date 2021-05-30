import React from 'react'
import tw from 'twin.macro'
import styled, { css } from 'styled-components'

import Layout from '../sections/Layout'

import { TextButton } from '../components'

const Design = () => {
   const [projects] = React.useState([
      {
         title: 'Quick Polls',
         description:
            'A voting application where people can create polls that other people can vote on and share their opinions.',
         url: 'https://www.figma.com/file/LnRJhWb4uot90YYgVWqQxYCz/Quick-Polls?node-id=0%3A1',
         thumb: '/images/design/quick-polls.png',
      },
      {
         title: 'Expense App',
         description:
            'Create and manage your expenses with statistics and visualizations to help you in savings.',
         url: 'https://www.figma.com/file/MXXyWDlL6IGqzXQvZphEipoB/Expense-App?node-id=0%3A1',
         thumb: '/images/design/expenses.jpg',
      },
      {
         title: 'Property App',
         description:
            'A platform of people looking for renting, buying or selling a place. Curates all available homes in a public feed for people to swift through.',
         url: 'https://www.figma.com/file/V9kIPeesyo8PvF8vmWhkogAX/Property-app?node-id=0%3A1',
         thumb: '/images/design/property.png',
      },
      {
         title: 'Octane HRMS',
         description:
            'Octane is a comprehensive HR solution based on SAP B1 and powered by Embee. Octane is an HR tool that will enable you to manage your workforce with much more ease and flexibility.',
         url: 'https://www.figma.com/file/NQA1eGIPdhSztZ9kzQLKZifd/Octane',
         thumb: '/images/design/octane.png',
      },
      {
         title: 'Samayla',
         description:
            'SamayLa is a web-based work management and communication system that helps users be more organized and productive. It enables teams and individuals to manage their tasks in a logical structure.',
         url: 'https://www.figma.com/file/CLwADoW5YMHU184wrLIWWXbI/App-Design?node-id=0%3A1',
         thumb: '/images/design/samayla.png',
      },
   ])
   return (
      <Layout
         meta={{
            title: 'Design | Praveen Bisht | Software Engineer',
            description:
               "Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation. I've experience with both design & development(front-end & back-end).",
            keywords:
               'accessibility, photoshop, typography, web, ux, ui, illustrator, after effects, aesthetics, animation, figma, design, user interface, user experience',
            url: '/design',
         }}
      >
         <h1 tw="text-3xl my-6 px-2">Designs</h1>
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
                        title={project.title}
                     >
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

export default Design

export const PageHeading = styled.h1(
   ({ theme: { size } }) => css`
      color: #ffffff;
      font-weight: 400;
      font-size: ${size.lg};
      margin: ${size.lg} 0;
   `
)

export const Projects = styled.ul(
   ({ theme: { size } }) => css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(260px, 1fr);
      grid-gap: ${size.md};
      @media (max-width: 980px) {
         grid-template-columns: 1fr;
         grid-auto-rows: auto;
      }
   `
)

export const Project = styled.li(
   ({ theme: { size, colors } }) => css`
      display: flex;
      overflow: hidden;
      list-style: none;
      flex-direction: column;
      border-radius: ${size.xs};
      background: ${colors.dark['300']};
      header {
         div {
            position: relative;
            padding-top: 56.25%;
            img {
               top: 0;
               width: 100%;
               position: absolute;
            }
         }
         h3 {
            font-weight: 500;
            font-size: ${size.md};
            padding: 0 ${size.md};
            margin: ${size.sm} 0;
            @media (max-width: 567px) {
               padding: 0 ${size.sm};
            }
         }
      }
      main {
         padding: 0 ${size.md};
         height: 100%;
         @media (max-width: 567px) {
            padding: 0 ${size.sm};
         }
         p {
            font-size: 18px;
            line-height: 27px;
            @media (max-width: 567px) {
               font-weight: 300;
            }
         }
      }
      footer {
         padding: ${size.md};
         margin-top: auto;
         @media (max-width: 567px) {
            padding: ${size.sm};
         }
      }
   `
)
