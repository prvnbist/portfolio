import { Metadata } from 'next'

import client from '@/lib/graphql'
import { SKILLS, TIMELINES } from '@/queries'
import type { Skill, Timeline } from '@/type'

import Header from './sections/header'
import Skills from './sections/skills'
import Timelines from './sections/timelines'

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

const getTimelines = async (): Promise<Timeline[]> => {
   const { timelines = [] } =
      await client.request<Promise<{ timelines: Timeline[] }>>(TIMELINES)

   return timelines
}

const getSkills = async (): Promise<
   Record<string, Record<string, Array<Skill>>>
> => {
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
         <Header />
         <Skills skills={skills} />
         <Timelines timelines={timelines} />
      </>
   )
}
