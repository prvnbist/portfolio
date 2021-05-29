import React from 'react'
import styled, { css } from 'styled-components'

import Layout from '../sections/Layout'
import { TextButton } from '../components'

export default () => {
   const [projects] = React.useState([
      {
         title: 'Expenses App',
         description: 'A self-hosted app to manage your expenses/earnings.',
         code: 'https://github.com/prvnbist/expenses',
         thumb: '/images/design/expenses.jpg',
      },
      {
         title: 'Transcode',
         description:
            'A platform hosting collection of tools for textual transformation.',
         demo: 'https://transcode.prvnbist.com/',
         code: 'https://github.com/prvnbist/transcode',
         thumb: '/images/code/transcode.png',
      },
      {
         title: 'Snippify',
         description:
            'A snippet management app built with monaco text editor and supports over 30 languages with syntax highlighting.',
         code: 'https://github.com/prvnbist/snippify',
         thumb: '/images/code/snippify.png',
      },
      {
         title: 'Karya',
         description:
            'A simple todo application to manage your tasks and categorize them by using labels.',
         code: 'https://github.com/prvnbist/karya',
         thumb: '/images/code/karya.png',
      },
      {
         title: 'Recipe',
         description: 'A simple recipe for recipe management in one place',
         code: 'https://codesandbox.io/s/recipe-app-reactredux-z7ngi',
         demo: 'https://z7ngi.codesandbox.io/',
         thumb: '/images/code/recipe.png',
      },
   ])
   return (
      <Layout
         meta={{
            title: 'Code | Praveen Bisht | Software Engineer',
            description:
               "Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation. I've experience with both design & development(front-end & back-end).",
            keywords:
               'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
            url: '/code',
         }}
      >
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
                           title={project.title}
                        >
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
                           title={project.title}
                        >
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
         a {
            margin-right: ${size.sm};
         }
      }
   `
)
