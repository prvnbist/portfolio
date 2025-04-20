import type { Metadata } from 'next'

const SEO = {
	url: 'https://www.prvnbist.com',
	title: 'Praveen Bisht | Frontend Engineer',
	description:
		'Hey👋🏼, I’m a front end engineer with the background in full stack based in New Delhi, India who enjoys building products from idea to implementation.',
	keywords:
		'front end, back end, design, html, pug, css, scss, javascript, skilljs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
	thumb: '/images/thumbs/home.jpg',
	twitterId: '@prvnbist',
}

export const metadata: Metadata = {
	title: SEO.title,
	description: SEO.description,
	keywords: SEO.keywords,
	applicationName: SEO.title,
	metadataBase: new URL(SEO.url),
	openGraph: {
		type: 'website',
		url: SEO.url,
		title: SEO.title,
		description: SEO.description,
		images: SEO.thumb,
		siteName: SEO.title,
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		site: SEO.twitterId,
		title: SEO.title,
		description: SEO.description,
		images: SEO.thumb,
	},
}
