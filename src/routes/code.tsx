import { createFileRoute } from '@tanstack/react-router'
import { pageTitle } from '@/config/site'
import { seo } from '@/lib/seo'

import Project from '@/app/code/project'
import { PageContainer, PageHero } from '@/components/layout'
import { pillClass } from '@/components/ui'
import { FEATURED_PROJECT, PROJECTS } from '@/data/projects'

export const Route = createFileRoute('/code')({
	head: () =>
		seo({
			path: '/code',
			title: pageTitle('Code'),
			description:
				"Here's a list of all the projects I've built over the years with various technologies.",
			image: '/images/thumbs/code.jpg',
		}),
	component: Code,
})

const TECH = ['TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL', 'Postgres', 'Tailwind']

function Code() {
	return (
		<>
			<PageHero
				command="ls code/ | wc -l"
				title="Code"
				srSuffix=": projects I've built over the years"
				glows={['bg-yellow-400/20', 'bg-pink-400/20']}
				className="pb-24"
			>
				<ul className="mt-8 flex max-w-150 flex-wrap justify-center gap-2">
					{TECH.map(tech => (
						<li key={tech} className={pillClass()}>
							{tech}
						</li>
					))}
				</ul>
			</PageHero>
			<PageContainer as="section">
				<ul className="-mx-4 grid grid-cols-1 border-t border-line md:grid-cols-2 lg:-mx-8">
					<Project project={FEATURED_PROJECT} is_featured />
					{PROJECTS.map((project, index) => (
						<Project key={project.title} project={project} index={index + 1} />
					))}
				</ul>
			</PageContainer>
		</>
	)
}
