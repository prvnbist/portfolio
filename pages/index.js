import React from 'react'
import styled, { css } from 'styled-components'

import Layout from '../sections/Layout'

const Home = () => {
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
            <div>
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
                  <span>idea to implementation</span>. Currently{' '}
                  <span>engineering solutions</span> for mealkit industry by
                  building a ecosystem of interconnected applications.
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
            </div>
         </StyledWrapper>
      </Layout>
   )
}

export default Home

export const StyledWrapper = styled.div`
   display: flex;
   height: inherit;
   align-items: center;
   height: calc(100vh - 89px);
   @media (max-width: 567px) {
      display: unset;
      div {
         margin-top: 120px;
      }
   }
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
