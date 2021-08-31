import React from 'react'
import tw from 'twin.macro'
import styled, { css } from 'styled-components'

import client from '../libs/graphql'
import Layout from '../sections/Layout'
import { TextButton } from '../components'

const Code = ({ codes = [] }) => {
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
         <h1 tw="text-3xl my-6 px-2">Code</h1>
         <Projects>
            {codes.map(code => (
               <Project key={code.url}>
                  <header>
                     {code.thumbnail?.url && (
                        <div>
                           <img src={code.thumbnail.url} alt={code.title} />
                        </div>
                     )}
                     <h3>{code.title}</h3>
                  </header>
                  <main>
                     <p>{code.description}</p>
                  </main>
                  <footer>
                     {code.code_url && (
                        <a
                           href={code.code_url}
                           target="_blank"
                           rel="noopener noreferrer"
                           title={code.title}
                        >
                           <TextButton type="solid" typeColor="blue.400">
                              Code
                           </TextButton>
                        </a>
                     )}
                     {code.demo_url && (
                        <a
                           href={code.demo_url}
                           target="_blank"
                           rel="noopener noreferrer"
                           title={code.title}
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

export default Code

export const getStaticProps = async () => {
   const { codes = [] } = await client.request(CODES)
   return {
      props: { codes },
   }
}

const CODES = `
   query codes {
      codes(orderBy: priority_ASC) {
         id
         title
         code_url
         demo_url
         thumbnail {
            id
            url
         }
         description
      }
   }
`

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
            overflow: hidden;
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
