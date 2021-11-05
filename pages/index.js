import React from 'react'
import Head from 'next/head'
import tw, { styled, css } from 'twin.macro'

import client from 'libs/graphql'
import Layout from 'sections/Layout'
import { ComboButton } from 'components'

const seo = {
   url: 'https://www.prvnbist.com',
   thumb: '/images/thumbs/home.jpg',
   title: 'Praveen Bisht | Frontend Engineer',
   description:
      'Hey👋🏼, I’m a front end engineer with the background in full stack based in New Delhi, India who enjoys building products from idea to implementation.',
   keywords:
      'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
}

const Home = ({ skills = {}, timelines = [] }) => {
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
         <Header>
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
                  , I’m a <span>front end engineer</span> with the background in
                  full stack based in New Delhi, India who enjoys building
                  products from <span>idea to implementation</span>.
               </StyledPara>
               <a
                  href="/docs/Praveen Bisht - Resume.pdf"
                  download="Praveen Bisht - Resume.pdf"
               >
                  <ComboButton type="outline" typeColor="blue.400">
                     <FileIcon tw="stroke-current" /> Download Resume
                  </ComboButton>
               </a>
               <StyledSocials>
                  {socials.map(social => (
                     <StyledSocial key={social.url}>
                        <a
                           href={social.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           title={social.title}
                           tw="text-indigo-400"
                        >
                           {social.title}
                        </a>
                     </StyledSocial>
                  ))}
               </StyledSocials>
            </div>
         </Header>
         <section tw="w-full px-4 mx-auto lg:w-[980px]">
            <section tw="mt-16">
               <h2 tw="text-3xl mb-4">Skills</h2>
               <ul tw="grid md:grid-cols-2">
                  {Object.keys(skills).map((key, index) => (
                     <section
                        key={key}
                        css={[
                           index === 0 &&
                              tw`md:(col-span-2 border-b border-gray-700)`,
                           index !== 0 &&
                              index % 2 !== 0 &&
                              tw`md:(pt-3 border-r border-gray-700)`,
                           index !== 0 && index % 2 === 0 && tw`md:p-3`,
                        ]}
                     >
                        <h3 tw="mb-1 text-gray-500 uppercase font-medium tracking-wider">
                           {key}
                        </h3>
                        {Object.keys(skills[key]).map(sub_key => (
                           <React.Fragment key={sub_key}>
                              <h4 tw="mb-1 text-yellow-300">{sub_key}</h4>
                              <ul tw="mb-4 flex flex-wrap gap-3">
                                 {skills[key][sub_key].map(node => (
                                    <Skill key={node.id} skill={node} />
                                 ))}
                              </ul>
                           </React.Fragment>
                        ))}
                     </section>
                  ))}
               </ul>
            </section>
         </section>
         <section tw="w-full px-4 mx-auto lg:w-[980px]">
            <section tw="mt-16">
               <h2 tw="text-3xl mb-4">Timeline</h2>
               <ul tw="space-y-10">
                  {timelines.map(timeline => (
                     <TimelineItem key={timeline.id} timeline={timeline} />
                  ))}
               </ul>
            </section>
         </section>
      </Layout>
   )
}

export default Home

export const getStaticProps = async () => {
   const { timelines = [] } = await client.request(TIMELINES)
   const { skills: _skills = [] } = await client.request(SKILLS)

   let skills = {}

   _skills.forEach(node => {
      let { id, title, category, sub_category } = node

      category = category.match(/[A-Z][a-z]+/g).join(' ')
      sub_category = sub_category
         ? sub_category.match(/[A-Z][a-z]+/g).join(' ')
         : 'Others'

      if (!(category in skills)) {
         skills = {
            ...skills,
            [category]: {},
         }
      }

      if (!(sub_category in skills[category])) {
         skills[category] = {
            ...skills[category],
            [sub_category]: [],
         }
      }

      skills[category] = {
         ...skills[category],
         [sub_category]: [
            ...skills[category][sub_category],
            {
               id,
               title,
            },
         ],
      }
   })

   return {
      props: { timelines, skills },
   }
}

const SKILLS = `
   query skills {
      skills {
         id
         title
         category
         sub_category
      }
   }
`

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

const TimelineItem = ({ timeline }) => {
   return (
      <li>
         {timeline.location && (
            <span tw="text-gray-500 font-medium text-sm uppercase">
               {timeline.location}
            </span>
         )}
         <header tw="mb-2 md:flex md:justify-between">
            <h3 tw="text-lg flex">
               {timeline.title}
               {timeline.url && (
                  <a
                     href={timeline.url}
                     rel="noreferrer noopener"
                     target="_blank"
                     tw="ml-1 h-8 w-8 flex items-center justify-center rounded hover:bg-gray-800"
                  >
                     <LinkIcon size="16" tw="stroke-current" />
                  </a>
               )}
            </h3>
            {timeline.from && (
               <section tw="mt-1 md:mt-0 text-yellow-400">
                  <span>
                     {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                     }).format(new Date(timeline.from))}
                  </span>
                  {timeline.to && ` - `}
                  {timeline.to && (
                     <span>
                        {new Intl.DateTimeFormat('en-US', {
                           year: 'numeric',
                           month: 'short',
                        }).format(new Date(timeline.to))}
                     </span>
                  )}
                  {timeline.is_current && <span> - Present</span>}
               </section>
            )}
         </header>
         <p tw="mb-4 text-[18px] text-gray-500">{timeline.description}</p>
      </li>
   )
}

const Header = styled.header`
   height: 600px;
   background-image: url('/images/me.png');
   ${tw`relative flex items-center bg-center bg-no-repeat bg-cover`}
   &:after {
      z-index: 1;
      content: '';
      background: rgba(25, 25, 28, 0.9);
      background: linear-gradient(
         to bottom,
         rgba(25, 25, 28, 0.8) 0%,
         rgba(25, 25, 28, 1) 100%
      );
      ${tw`w-full h-full absolute top-0 left-0`}
   }
   > div {
      z-index: 2;
      margin: 0 auto;
      max-width: 980px;
      position: relative;
      width: calc(100vw - 32px);
   }
`

const StyledName = styled.h2(
   ({ theme: { size } }) => css`
      font-weight: 400;
      font-size: ${size.xl};
      ${tw`text-yellow-300`}
      @media (max-width: 567px) {
         font-size: ${size.md};
      }
   `
)

const StyledHeading = styled.h1(
   ({ theme: { size } }) => css`
      color: #fff;
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

const StyledPara = styled.p`
   color: #fff;
   font-size: 20px;
   line-height: 30px;
   margin-bottom: 14px;
   span {
      ${tw`text-yellow-300`}
   }
   @media (max-width: 567px) {
      font-size: 18px;
   }
`

const StyledSocials = styled.ul(
   ({ theme: { size } }) => css`
      width: 100%;
      display: grid;
      grid-gap: 4px;
      grid-auto-rows: 32px;
      margin-top: ${size.lg};
      grid-template-columns: 1fr 1fr 1fr;
      @media (max-width: 567px) {
         grid-template-columns: 1fr 1fr;
      }
   `
)

const StyledSocial = styled.li(
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

const Skill = ({ skill }) => {
   return (
      <li tw="flex-shrink-0 items-start px-3 py-1 border border-gray-800 rounded">
         {skill.title}
      </li>
   )
}

const LinkIcon = ({ size = 18, ...props }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
   >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
   </svg>
)

const FileIcon = ({ size = 18, ...props }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
   >
      <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
   </svg>
)
