import { Metadata } from 'next'

import Link from 'next/link'

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

const FEATURED_PROJECT = {
   img_url: '/images/code/tracksubs_1.jpg',
   title: 'TrackSubs',
   description:
      'Streamline your finances and stay on top of recurring expenses effortlessly.',
   demo_url: 'https://www.tracksubs.co',
   code_url: 'https://github.com/prvnbist/tracksubs',
   tech_stack: [
      'NextJs',
      'MantineUI',
      'KnexJs',
      'Clerk(Authentication)',
      'Xata(Postgres)',
      'Trigger.dev(Email Scheduling)',
      'Resend(Emails)',
      'Vercel(Hosting)',
      'Statsig(Feature Flags)',
   ],
}

const PROJECTS = [
   {
      img_url: '/images/code/jsonvi_1.png',
      title: 'JSONVi',
      description:
         'A straightforward JSON Viewer with handy features to assist you with your everyday JSON tasks effortlessly.',
      demo_url: 'https://json-viewer.prvnbist.com',
      tech_stack: [],
   },
   {
      img_url: '/images/code/undata_1.png',
      title: 'Undata',
      description:
         'Simplified Database query execution and visualization, enabling easy understanding, transformation, and exportation of your data to suit your needs.',
      code_url: 'https://github.com/prvnbist/undata',
      tech_stack: [],
   },
   {
      img_url: '/images/code/ledger_1.png',
      title: 'Ledger 🚧',
      tech_stack: [],
      description:
         'Our app offers intuitive tools for mastering personal finance, providing comprehensive metrics to track and analyze your spending habits with ease. Take control ofyour finances and achieve your financial goals effortlessly.',
   },
   {
      img_url: '/images/code/transcode_1.png',
      title: 'Transcode',
      tech_stack: [],
      description:
         'A collection of handy tools tailored to meet the everyday needs of developers, simplifying common tasks with ease.',
      demo_url: 'https://transcode.vercel.app/json?translator=yaml',
      code_url: 'https://github.com/prvnbist/transcode',
   },
]

export default async function Code() {
   return (
      <section className="w-full px-4 lg:px-0 mx-auto lg:w-[980px]">
         <h1 className="text-3xl my-6">Code</h1>
         <Project project={FEATURED_PROJECT} is_featured />
         <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {PROJECTS.map(project => (
               <Project key={project.title} project={project} />
            ))}
         </ul>
      </section>
   )
}

type ProjectProps = {
   is_featured?: boolean
   project: {
      img_url: string
      title: string
      description: string
      demo_url?: string
      code_url?: string
      tech_stack: Array<string>
   }
}

const Project = ({ project, is_featured = false }: ProjectProps) => {
   return (
      <li
         className={`list-none ${is_featured ? 'md:grid md:grid-cols-2 md:gap-8' : ''}`}
      >
         <header className="border border-dark-200 aspect-[4/3] rounded-md overflow-hidden">
            {/* eslint-disable-next-line */}
            <img alt={project.title} src={project.img_url} />
         </header>
         <main className="mt-3">
            <h2 className="text-xl">{project.title}</h2>
            <p className="mt-1 mb-3">{project.description}</p>
            <ul className="flex gap-2 flex-wrap mb-3">
               {project.tech_stack.map(tech => (
                  <li
                     key={tech}
                     title={tech}
                     className="bg-dark-200 border border-dark-100 rounded px-2 py-[0.5px] text-sm font-[200]"
                  >
                     {tech}
                  </li>
               ))}
            </ul>
            {(project.demo_url || project.code_url) && (
               <div className="flex gap-3">
                  {project.demo_url && (
                     <Link
                        target="_blank"
                        href={project.demo_url}
                        className="text-sm px-5 h-10 inline-flex items-center rounded-md border border-blue-400 text-white hover:bg-blue-400 transition-colors ease-in"
                     >
                        Demo
                     </Link>
                  )}
                  {project.code_url && (
                     <Link
                        target="_blank"
                        href={project.code_url}
                        className={`text-sm px-5 h-10 inline-flex items-center rounded-md border hover:border-blue-400 text-white hover:bg-blue-400 transition-colors ease-in ${!project.demo_url ? 'border-blue-400' : 'border-transparent'}`}
                     >
                        Code
                     </Link>
                  )}
               </div>
            )}
         </main>
      </li>
   )
}
