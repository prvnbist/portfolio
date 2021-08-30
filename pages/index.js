import React from 'react'
import tw from 'twin.macro'
import styled, { css } from 'styled-components'

import client from '../libs/graphql'
import Layout from '../sections/Layout'

const Home = ({timelines=[]}) => {
   const [socials] = React.useState([
      {
         title: '🖼️ Instagram',
         url: 'https://www.instagram.com/prvnbist',
      },
      { title: '🐤 Twitter', url: 'https://www.twitter.com/prvnbist' },
      { title: '🤝🏼 LinkedIn', url: 'https://www.linkedin.com/in/prvnbist' },
      { title: '👨‍💻 Github', url: 'https://www.github.com/prvnbist' },
      { title: '🎨 Dribbble', url: 'https://www.dribbble.com/prvnbist' },
      { title: '👨‍💻 Codepen', url: 'https://www.codepen.io/prvnbist' },
   ])
   return (
      <Layout
         meta={{
            title: 'Praveen Bisht | Software Engineer',
            description:
               "Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation. I've experience with both design & development(front-end & back-end).",
            keywords:
               'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
         }}
      >
         <StyledWrapper>
            <StyledName>Praveen Bisht</StyledName>
            <StyledHeading>
               I design
               <span role="img" aria-label="paint board">
                  🎨
               </span>
               & code
               <span role="img" aria-label="computer">
                  👨‍💻
               </span>
            </StyledHeading>
            <StyledPara>
               Hey
               <span role="img" aria-label="waving hand">
                  👋🏼
               </span>
               , I’m a <span>software engineer</span> based in New Delhi who
               enjoys building products from{' '}
               <span>idea to implementation</span>. Currently looking for a <span>front end engineer</span> role to build intuitive interfaces.
            </StyledPara>
            <StyledSkills>
               {socials.map(social => (
                  <StyledSkill key={social.url}>
                     <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.title}
                     >
                        {social.title}
                     </a>
                  </StyledSkill>
               ))}
            </StyledSkills>
            <section tw="mt-32 mb-16">
               <h2 tw="text-3xl mb-4">Timeline</h2>
               <ul tw="space-y-10">
                  {timelines.map(timeline => <TimelineItem key={timeline.id} timeline={timeline}/>)}
               </ul>
            </section>
         </StyledWrapper>
      </Layout>
   )
}

export default Home

export const getStaticProps = async () => {
   const {timelines = []} = await client.request(TIMELINES)
   return {
      props: {timelines},
   }
}

const TIMELINES = `
   query timelines {
      timelines(orderBy: from_DESC) {
         id
         url
         title
         from
         to
         location
         is_current
         description
      }
   }
 `

const TimelineItem = ({timeline}) => {
   return <li>
      {timeline.location && <span tw="text-gray-500 font-medium text-sm uppercase">{timeline.location}</span>}
      <header tw="mb-2 md:flex md:justify-between">
         <h3 tw="text-lg flex">{timeline.title}
            {timeline.url && <a href={timeline.url} rel="noreferrer noopener" target="_blank" tw="ml-1 h-8 w-8 flex items-center justify-center rounded hover:bg-gray-800">
               <LinkIcon size="16" tw="stroke-current"/>
            </a>}
         </h3>
         {timeline.from && <section tw="mt-1 md:mt-0 text-yellow-400">
               <span>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: "short"}).format(new Date(timeline.from))}</span>
               {timeline.to && ` - `}
               {timeline.to && <span>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: "short"}).format(new Date(timeline.to))}</span>}
               {timeline.is_current && <span> - Present</span>}
            </section>
         }
      </header>
      <p tw="mb-4 text-[18px] text-gray-500">{timeline.description}</p>
   </li>
}

export const StyledWrapper = styled.div`
   padding-top: 120px;
`

export const StyledName = styled.h2(
   ({ theme: { size } }) => css`
      font-weight: 400;
      font-size: ${size.xl};
      @media (max-width: 567px) {
         font-size: ${size.md};
      }
   `
)

export const StyledHeading = styled.h1(
   ({ theme: { size } }) => css`
      color: #636e84;
      font-size: 96px;
      font-weight: 500;
      margin-bottom: ${size.md};
      @media (max-width: 980px) {
         font-size: 64px;
      }
      @media (max-width: 567px) {
         font-size: ${size.xxl};
      }
   `
)

export const StyledPara = styled.p`
   color: #636e84;
   font-size: 20px;
   line-height: 30px;
   span {
      color: #fff;
   }
   @media (max-width: 567px) {
      font-size: 18px;
   }
`

export const StyledSkills = styled.ul(
   ({ theme: { size } }) => css`
      width: 100%;
      display: grid;
      grid-gap: 4px;
      grid-auto-rows: 32px;
      margin-top: ${size.sm};
      grid-template-columns: 1fr 1fr 1fr;
      @media (max-width: 567px) {
         grid-template-columns: 1fr 1fr;
      }
   `
)

export const StyledSkill = styled.li(
   ({ theme: { size } }) => css`
      display: flex;
      color: #636e84;
      font-size: 18px;
      list-style: none;
      font-weight: 400;
      align-items: center;
      a {
         text-decoration: none;
      }
   `
)

const LinkIcon = ({size=18, ...props}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>)