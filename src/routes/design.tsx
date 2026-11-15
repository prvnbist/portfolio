import { createFileRoute } from '@tanstack/react-router'
import { pageTitle } from '@/config/site'
import { seo } from '@/lib/seo'

import ProjectCard from '@/components/ProjectCard'
import { PageContainer, PageHero } from '@/components/layout'
import { DESIGNS } from '@/data/designs'

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
		<>
			<PageHero
				command="ls design/ | wc -l"
				title="Design"
				srSuffix=": interfaces I've designed over the years"
				glows={['bg-pink-400/20', 'bg-sky-400/20']}
				className="pb-24"
			/>
			<PageContainer as="section">
				<ul className="-mx-4 grid grid-cols-1 border-t border-line md:grid-cols-2 lg:-mx-8">
					{DESIGNS.map((design, index) => (
						<ProjectCard
							key={design.id}
							index={index}
							aspect="video"
							title={design.title}
							description={design.description}
							image={design.thumbnail}
							actions={[{ label: 'View in Figma', href: design.url }]}
						/>
					))}
				</ul>
			</PageContainer>
		</>
	)
}
