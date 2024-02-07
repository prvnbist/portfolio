import { Metadata } from 'next'
import { Fragment } from 'react'

import client from '@/lib/graphql'
import { SKILLS, TIMELINES } from '@/queries'

import classes from './page.module.css'

const seo = {
   url: 'https://www.prvnbist.com',
   thumb: '/images/thumbs/home.jpg',
   title: 'Praveen Bisht | Frontend Engineer',
   description:
      'Hey👋🏼, I’m a front end engineer with the background in full stack based in New Delhi, India who enjoys building products from idea to implementation.',
   keywords:
      'front end, back end, design, html, pug, css, scss, javascript, skilljs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
}

export const metadata: Metadata = {
   title: seo.title,
   description: seo.description,
   keywords: seo.keywords,
   applicationName: seo.title,
   metadataBase: new URL(seo.url),
   openGraph: {
      type: 'website',
      url: seo.url,
      title: seo.title,
      description: seo.description,
      images: seo.thumb,
   },
   twitter: {
      card: 'summary_large_image',
      site: '@prvnbist',
      title: seo.title,
      description: seo.description,
      images: seo.thumb,
   },
}

const SOCIALS = [
   {
      title: '🖼️ Instagram',
      url: 'https://www.instagram.com/prvnbist',
   },
   { title: '🐤 Twitter', url: 'https://www.twitter.com/prvnbist' },
   { title: '🤝🏼 LinkedIn', url: 'https://www.linkedin.com/in/prvnbist' },
   { title: '👨‍💻 Github', url: 'https://www.github.com/prvnbist' },
   { title: '🎨 Dribbble', url: 'https://www.dribbble.com/prvnbist' },
   { title: '👨‍💻 Codepen', url: 'https://www.codepen.io/prvnbist' },
]

type Timeline = {
   id: string
   url: string
   title: string
   from: string
   to: string
   location: string
   is_current: boolean
   description: string
}

type Skill = {
   id: string
   title: string
   category: string
   sub_category: string
}

const getTimelines = async () => {
   const { timelines = [] } =
      await client.request<Promise<{ timelines: Timeline[] }>>(TIMELINES)

   return timelines
}

const getSkills = async () => {
   const { skills = [] } =
      await client.request<Promise<{ skills: Skill[] }>>(SKILLS)

   const _skills = skills.reduce((acc: { [key in string]: any }, item) => {
      const { category, sub_category } = item

      if (!acc[category]) {
         acc[category] = {}
      }

      if (sub_category && !acc[category][sub_category]) {
         acc[category][sub_category] = []
      }

      if (sub_category) {
         acc[category][sub_category].push(item)
      } else {
         acc[category]['Other'] = acc[category]['Other'] || []
         acc[category]['Other'].push(item)
      }

      return acc
   }, {})

   return _skills
}

export default async function Home() {
   const skills = await getSkills()
   const timelines = await getTimelines()
   return (
      <>
         <header className={classes.header}>
            <div>
               <h2 className={`${classes.name} text-yellow-300`}>
                  Praveen Bisht
               </h2>
               <h1 className={classes.tagline}>
                  I design
                  <span role="img" aria-label="paint board">
                     🎨
                  </span>
                  & code
                  <span role="img" aria-label="computer">
                     👨‍💻
                  </span>
               </h1>
               <p className={classes.about}>
                  Hey
                  <span
                     role="img"
                     aria-label="waving hand"
                     className="text-yellow-300"
                  >
                     👋🏼
                  </span>
                  , I’m a{' '}
                  <span className="text-yellow-300">frontend engineer</span>{' '}
                  with the background in full stack based in New Delhi, India
                  who enjoys building products from{' '}
                  <span className="text-yellow-300">
                     idea to implementation
                  </span>
                  .
               </p>
               <ul className={classes.socials}>
                  {SOCIALS.map(social => (
                     <li key={social.url} className={classes.social}>
                        <a
                           href={social.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           title={social.title}
                           className="text-indigo-400"
                        >
                           {social.title}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
         </header>
         <section className="w-full px-4 mx-auto lg:w-[980px]">
            <section className="mt-16">
               <h2 className="text-3xl mb-4">Skills</h2>
               <ul>
                  {Object.keys(skills).map((key, index) => (
                     <section key={key}>
                        <h3 className="mb-1 text-gray-500 uppercase font-medium tracking-wider">
                           {key}
                        </h3>
                        {Object.keys(skills[key]).map(sub_key => (
                           <Fragment key={sub_key}>
                              <h4 className="mb-1 text-yellow-300">
                                 {sub_key}
                              </h4>
                              <ul className="mb-4 flex flex-wrap gap-3">
                                 {skills[key][sub_key].map((skill: any) => (
                                    <li
                                       key={skill.id}
                                       className="flex-shrink-0 items-start px-3 py-1 border border-gray-800 rounded"
                                    >
                                       {skill.title}
                                    </li>
                                 ))}
                              </ul>
                           </Fragment>
                        ))}
                     </section>
                  ))}
               </ul>
            </section>
         </section>
         <section className="w-full px-4 mx-auto lg:w-[980px]">
            <section className="mt-16">
               <h2 className="text-3xl mb-4">Timeline</h2>
               <ul className="space-y-10">
                  {timelines.map(timeline => (
                     <TimelineItem key={timeline.id} timeline={timeline} />
                  ))}
               </ul>
            </section>
         </section>
      </>
   )
}

const TimelineItem = ({ timeline }: { timeline: Timeline }) => {
   return (
      <li>
         {timeline.location && (
            <span className="text-gray-500 font-medium text-sm uppercase">
               {timeline.location}
            </span>
         )}
         <header className="mb-2 md:flex md:justify-between">
            <h3 className="text-lg flex">
               {timeline.title}
               {timeline.url && (
                  <a
                     href={timeline.url}
                     rel="noreferrer noopener"
                     target="_blank"
                     className="ml-1 h-8 w-8 flex items-center justify-center rounded hover:bg-gray-800"
                  >
                     <LinkIcon size={16} className="stroke-current" />
                  </a>
               )}
            </h3>
            {timeline.from && (
               <section className="mt-1 md:mt-0 text-yellow-400">
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
         <p className="mb-4 text-[18px] text-gray-500">
            {timeline.description}
         </p>
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
