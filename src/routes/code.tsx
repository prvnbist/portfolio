import { createFileRoute } from '@tanstack/react-router'
import { pageTitle } from '@/config/site'
import { seo } from '@/lib/seo'

import ProjectCard, { type ProjectAction } from '@/components/ProjectCard'
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

type Links = { demo_url?: string; code_url?: string }

const actions = ({ demo_url, code_url }: Links): ProjectAction[] => [
	...(demo_url ? [{ label: 'Demo', href: demo_url }] : []),
	...(code_url ? [{ label: 'Code', href: code_url }] : []),
]

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
					<ProjectCard
						featured
						title={FEATURED_PROJECT.title}
						description={FEATURED_PROJECT.description}
						image={FEATURED_PROJECT.img_url}
						tags={FEATURED_PROJECT.tech_stack}
						actions={actions(FEATURED_PROJECT)}
					/>
					{PROJECTS.map((project, index) => (
						<ProjectCard
							key={project.title}
							index={index + 1}
							title={project.title}
							description={project.description}
							image={project.img_url}
							tags={project.tech_stack}
							actions={actions(project)}
						/>
					))}
				</ul>
			</PageContainer>
		</>
	)
}
