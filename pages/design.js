import React from 'react'
import tw from 'twin.macro'
import Head from 'next/head'
import styled, { css } from 'styled-components'

import client from '../libs/graphql'
import Layout from '../sections/Layout'

import { TextButton } from '../components'

const seo = {
   thumb: '/images/thumbs/design.jpg',
   url: 'https://www.prvnbist.com/design',
   title: 'Design | Praveen Bisht | Frontend Engineer',
   description:
      "Here's a list of all the projects I've designed over the years ranging from huge platforms to various tools.",
   keywords:
      'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
}

const Design = ({ designs = [] }) => {
   return (
      <Layout>
         <Head>
            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta name="keywords" content={seo.keywords} />
            <meta name="description" content={seo.description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={seo.url} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.thumb} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={seo.url} />
            <meta property="twitter:title" content={seo.title} />
            <meta property="twitter:description" content={seo.description} />
            <meta property="twitter:image" content={seo.thumb} />
         </Head>
         <section tw="w-full px-4 mx-auto lg:w-[980px]">
            <h1 tw="text-3xl my-6 px-2">Designs</h1>
            <Projects>
               {designs.map(design => (
                  <Project key={design.id}>
                     <header>
                        <div>
                           <img src={design.thumbnail.url} alt={design.title} />
                        </div>
                        <h3>{design.title}</h3>
                     </header>
                     <main>
                        <p>{design.description}</p>
                     </main>
                     <footer>
                        <a
                           href={design.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           title={design.title}
                        >
                           <TextButton type="outline" typeColor="blue.400">
                              View Project
                           </TextButton>
                        </a>
                     </footer>
                  </Project>
               ))}
            </Projects>
         </section>
      </Layout>
   )
}

export default Design

export const getStaticProps = async () => {
   const { designs = [] } = await client.request(DESIGNS)
   return {
      props: { designs },
   }
}

const DESIGNS = `
   query designs {
      designs(orderBy: priority_ASC) {
         id
         url
         title
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
