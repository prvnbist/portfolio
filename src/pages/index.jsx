import React from 'react'

import Layout from '../sections/Layout'

import {
   StyledWrapper,
   StyledHeading,
   StyledPara,
   StyledSkills,
   StyledSkill,
   StyledImage
} from '../styles/index'

const IndexPage = () => {
   const [socials] = React.useState([
      {
         title: 'Instagram🖼️',
         url: 'https://www.instagram.com/prvnbist'
      },
      { title: 'Twitter🐤', url: 'https://www.twitter.com/prvnbist' },
      { title: 'Github👨‍💻', url: 'https://www.github.com/prvnbist' },
      { title: 'LinkedIn🤝🏼', url: 'https://www.linkedin.com/in/prvnbist' },
      { title: 'Dribbble🎨', url: 'https://www.dribbble.com/prvnbist' },
      { title: 'Codepen👨‍💻', url: 'https://www.codepen.com/prvnbist' }
   ])
   return (
      <Layout>
         <StyledWrapper>
            <div>
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
                  , I’m Praveen, a <span>software engineer</span> based in New
                  Delhi who enjoys building apps from{' '}
                  <span>idea to implementation</span>. Currently{' '}
                  <span>engineering solutions</span> for mealkit industry by
                  building a ecosystem of interconnected applications.
               </StyledPara>
               <StyledSkills>
                  {socials.map(social => (
                     <StyledSkill key={social.url}>
                        <a href={social.url}>{social.title}</a>
                     </StyledSkill>
                  ))}
               </StyledSkills>
            </div>
            <StyledImage>
               <img
                  alt="Praveen Bisht"
                  src="https://res.cloudinary.com/prvnbist/image/upload/v1578682225/portfolio/dp.png"
                  title="Not really religious, just really like this picture😂"
               />
            </StyledImage>
         </StyledWrapper>
      </Layout>
   )
}

export default IndexPage
