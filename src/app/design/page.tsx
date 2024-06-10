import type { Metadata } from 'next'

import client from '@/lib/graphql'
import { DESIGNS } from '@/queries'

import Project from './project'
import classes from './design.module.css'

const seo = {
	url: 'https://www.prvnbist.com/design',
	thumb: '/images/thumbs/home.jpg',
	title: 'Design | Praveen Bisht | Frontend Engineer',
	description:
		"Here's a list of all the projects I've designed over the years ranging from huge platforms to various tools.",
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

type Design = {
	id: string
	url: string
	title: string
	thumbnail: {
		id: string
		url: string
	}
	description: string
}

const getProjects = async () => {
	const { designs = [] } = await client.request<Promise<{ designs: Design[] }>>(DESIGNS)
	return designs
}

export default async function Design() {
	const designs = await getProjects()
	return (
		<section className="w-full px-4 mx-auto lg:w-[980px]">
			<h1 className="text-3xl my-6 px-2">Designs</h1>
			<ul className={classes.projects}>
				{designs.map(design => (
					<Project key={design.id} design={design} />
				))}
			</ul>
		</section>
	)
}
