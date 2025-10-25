import type { Metadata } from 'next'

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

const TIMELINES = [
	{
		id: 'cm69mkxtw9cxm06uvi883q3wr',
		url: 'https://www.saaslabs.co',
		institution: 'SaaSLabs',
		duration: [
			{
				title: 'Senior SDE',
				from: '2025-10-22',
				to: null,
			},
			{
				title: 'SDE 2',
				from: '2024-12-10',
				to: '2025-10-22',
			},
		],
		location: 'Noida, India',
		description: [
			'JustCall: Connect with prospects and customers across voice, SMS, email, and WhatsApp. Automate workflows with 100+ integrations and AI magic, and watch your business grow on autopilot.',
			'ServiceAgent: Call Answering AI Agent for service businesses built during 48hr hackathon using React, NodeJs, Auth0, Retell, and Twillio.',
		],
	},
	{
		id: 'clfcofkadc6tp0butthr9fxqw',
		url: 'https://qatalog.com/',
		institution: 'Qatalog',
		duration: [{ from: '2023-03-06', to: '2024-02-05', title: 'Frontend Engineer' }],
		location: 'Remote',
		description: [
			'Ownership of our workflows (FE) feature, integrate incoming features and ensure smooth operation.',
			"Revamped integration's (FE) module to inline with out search product.",
			'Built organization switcher for a quick and intuitive change of organization.',
		],
	},
	{
		id: 'ckuw9a6dkhmws0b55y9akol0q',
		url: 'https://www.alterest.co/',
		institution: 'Alterest',
		duration: [{ from: '2021-10-06', to: '2023-03-05', title: 'Frontend Engineer' }],
		location: 'Remote',
		description: [
			'Collaborated with design team to bring out fresh UI to our platform complete with CSS style guide.',
			'Built SQL query visualization dashboard to analyze queries with tables and charts support. Integrated our reporting tool with the dashboard for custom reports.',
		],
	},
	{
		id: 'cksyy1jcwel1c0e08wu7b29g8',
		url: null,
		institution: 'Dailykit',
		duration: [{ from: '2019-08-01', to: '2021-07-31', title: 'SDE 1' }],
		location: 'Bengaluru, India',
		description: [
			'Built a file manager/editor for remote systems with git integration.',
			'End to end subscription store for meal kits. Built with NextJs, GraphQL, Stripe/Razorpay and Hasura/Postgres.',
		],
	},
	{
		id: 'cksyxwabcebzl0b98ra203jal',
		url: null,
		institution: 'Geb & Nut',
		duration: [{ from: '2019-01-01', to: '2019-05-01', title: 'UI/UX Designer' }],
		location: 'New Delhi, India',
		description: [],
	},
	{
		id: 'cksyxsvmoef4t0d56k94zntrj',
		url: null,
		institution: 'Samayla',
		duration: [{ from: '2018-06-01', to: '2018-08-31', title: 'UI/UX Design Intern' }],
		location: 'New Delhi, India',
		description: [],
	},
	{
		id: 'cksyxp320eamp0b98o7sfmulv',
		url: null,
		institution: 'Adaan Digital Solutions',
		duration: [
			{
				from: '2017-06-01',
				to: '2017-07-01',
				title: 'Frontend Intern',
			},
		],
		location: 'New Delhi, India',
		description: [],
	},
	{
		id: 'cksyyp5o0enzw0d56t3ooc1f2',
		url: null,
		institution: 'Maharishi Dayanand University',
		duration: [
			{
				from: '2015-08-01',
				to: '2019-08-01',
				title: 'BTech. CSE',
			},
		],
		location: 'Rohtak, Haryana, India',
		description: [],
	},
]

export default async function Home() {
	return (
		<>
			<Header />
			<Timelines timelines={TIMELINES} />
		</>
	)
}
