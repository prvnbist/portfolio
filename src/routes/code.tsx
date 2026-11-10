import { createFileRoute } from '@tanstack/react-router'
import { canonical } from '@/lib/seo'

import Project from '@/app/code/project'
import { FEATURED_PROJECT, PROJECTS } from '@/data/projects'

const seo = {
	thumb: '/images/thumbs/code.jpg',
	url: 'https://www.prvnbist.com/code',
	title: 'Code | Praveen Bisht | Frontend Engineer',
	description:
		"Here's a list of all the projects I've built over the years with various technologies.",
	keywords:
		'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
}

export const Route = createFileRoute('/code')({
	head: () => ({
		links: canonical('/code'),
		meta: [
			{ title: seo.title },
			{ name: 'description', content: seo.description },
			{ name: 'keywords', content: seo.keywords },
			{ name: 'application-name', content: seo.title },
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: seo.url },
			{ property: 'og:title', content: seo.title },
			{ property: 'og:description', content: seo.description },
			{ property: 'og:image', content: `${seo.url.replace('/code', '')}${seo.thumb}` },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:site', content: '@prvnbist' },
			{ name: 'twitter:title', content: seo.title },
			{ name: 'twitter:description', content: seo.description },
			{ name: 'twitter:image', content: `${seo.url.replace('/code', '')}${seo.thumb}` },
		],
	}),
	component: Code,
})

function Code() {
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
