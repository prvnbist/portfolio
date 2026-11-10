import { createFileRoute } from '@tanstack/react-router'
import { canonical } from '@/lib/seo'

import { getDesigns } from '@/lib/cms'
import Project from '@/app/design/project'
import classes from '@/app/design/design.module.css'

const seo = {
	url: 'https://www.prvnbist.com/design',
	thumb: '/images/thumbs/home.jpg',
	title: 'Design | Praveen Bisht | Frontend Engineer',
	description:
		"Here's a list of all the projects I've designed over the years ranging from huge platforms to various tools.",
	keywords:
		'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
}

export const Route = createFileRoute('/design')({
	loader: () => getDesigns(),
	head: () => ({
		links: canonical('/design'),
		meta: [
			{ title: seo.title },
			{ name: 'description', content: seo.description },
			{ name: 'keywords', content: seo.keywords },
			{ name: 'application-name', content: seo.title },
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: seo.url },
			{ property: 'og:title', content: seo.title },
			{ property: 'og:description', content: seo.description },
			{ property: 'og:image', content: `https://www.prvnbist.com${seo.thumb}` },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:site', content: '@prvnbist' },
			{ name: 'twitter:title', content: seo.title },
			{ name: 'twitter:description', content: seo.description },
			{ name: 'twitter:image', content: `https://www.prvnbist.com${seo.thumb}` },
		],
	}),
	component: DesignPage,
})

function DesignPage() {
	const { data: designs, error } = Route.useLoaderData()
	if (error) {
		return (
			<section className="w-full px-4 mx-auto lg:w-[980px]">
				<h1 className="text-3xl my-6 px-2">Designs</h1>
				<p className="px-2 text-gray-400">
					Designs are unavailable right now. Please try again later.
				</p>
			</section>
		)
	}
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
