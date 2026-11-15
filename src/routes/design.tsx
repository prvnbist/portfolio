import { createFileRoute } from '@tanstack/react-router'
import { pageTitle } from '@/config/site'
import { seo } from '@/lib/seo'

import { DESIGNS } from '@/data/designs'
import Project from '@/app/design/project'
import classes from '@/app/design/design.module.css'

export const Route = createFileRoute('/design')({
	head: () =>
		seo({
			path: '/design',
			title: pageTitle('Design'),
			description:
				"Here's a list of all the projects I've designed over the years ranging from huge platforms to various tools.",
			image: '/images/thumbs/design.jpg',
		}),
	component: DesignPage,
})

function DesignPage() {
	return (
		<section className="w-full px-4 mx-auto lg:w-[920px] lg:px-8">
			<h1 className="text-3xl my-6 px-2">Designs</h1>
			<ul className={classes.projects}>
				{DESIGNS.map(design => (
					<Project key={design.id} design={design} />
				))}
			</ul>
		</section>
	)
}
