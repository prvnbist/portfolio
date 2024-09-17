import type { Metadata } from 'next'

import client from '@/lib/graphql'
import { TIMELINES } from '@/queries'
import type { Timeline } from '@/type'

import Header from './sections/header'
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
	const { timelines = [] } = await client.request<Promise<{ timelines: Timeline[] }>>(TIMELINES)

	return timelines
}

export default async function Home() {
	const timelines = await getTimelines()
	return (
		<>
			<Header />
			<Timelines timelines={timelines} />
		</>
	)
}
