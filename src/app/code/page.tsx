import { Metadata } from 'next'

import { CODES } from '@/queries'
import client from '@/lib/graphql'
import { Button } from '@/components'

import classes from './code.module.css'

const seo = {
   thumb: '/images/thumbs/code.jpg',
   url: 'https://www.prvnbist.com/code',
   title: 'Code | Praveen Bisht | Frontend Engineer',
   description:
      "Here's a list of all the projects I've built over the years with various technologies.",
   keywords:
      'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
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

type Code = {
   id: string
   title: string
   code_url: string
   demo_url: string
   thumbnail: {
      id: string
      url: string
   }
   description: string
}

const getProjects = async () => {
   const { codes = [] } =
      await client.request<Promise<{ codes: Code[] }>>(CODES)
   return codes
}

export default async function Code() {
   const codes = await getProjects()
   return (
      <section className="w-full px-4 mx-auto lg:w-[980px]">
         <h1 className="text-3xl my-6 px-2">Code</h1>
         <ul className={classes.projects}>
            {codes.map(code => (
               <li key={code.id} className={classes.project}>
                  <header>
                     {code.thumbnail?.url && (
                        <div>
                           {/* eslint-disable-next-line */}
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
                           <Button.Text variant="outline">Code</Button.Text>
                        </a>
                     )}
                     {code.demo_url && (
                        <a
                           href={code.demo_url}
                           target="_blank"
                           rel="noopener noreferrer"
                           title={code.title}
                        >
                           <Button.Text variant="outline">Demo</Button.Text>
                        </a>
                     )}
                  </footer>
               </li>
            ))}
         </ul>
      </section>
   )
}
