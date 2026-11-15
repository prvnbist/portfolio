import { createFileRoute } from '@tanstack/react-router'
import { pageTitle } from '@/config/site'
import { seo } from '@/lib/seo'

import { motion } from 'framer-motion'

import Project from '@/app/code/project'
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

const ANIMATE_PROPS = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
}

const TECH = ['TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL', 'Postgres', 'Tailwind']

function Code() {
	return (
		<>
			<header className="relative mx-auto flex w-full flex-col items-center overflow-hidden px-4 pt-28 pb-24 text-center lg:w-230">
				<span
					aria-hidden="true"
					className="pointer-events-none absolute top-10 left-1/4 h-64 w-64 motion-safe:animate-pulse rounded-full bg-yellow-400/20 blur-3xl"
				/>
				<span
					aria-hidden="true"
					className="pointer-events-none absolute top-24 right-1/4 h-64 w-64 motion-safe:animate-pulse rounded-full bg-pink-400/20 blur-3xl [animation-delay:1s]"
				/>
				<motion.p
					{...ANIMATE_PROPS}
					className="relative font-[family-name:var(--font-code)] text-sm text-gray-500"
				>
					<span className="text-emerald-400">~/prvnbist</span> $ ls code/ | wc -l
				</motion.p>
				<motion.h1
					{...ANIMATE_PROPS}
					className="relative mt-4 bg-linear-to-b from-[#f6d365] via-[#fda085] to-transparent bg-clip-text pb-2 font-stack text-[clamp(56px,15vw,150px)] leading-[0.9] font-bold tracking-tight text-transparent select-none"
				>
					Code
					<span className="sr-only">: projects I've built over the years</span>
				</motion.h1>
				<motion.ul
					{...ANIMATE_PROPS}
					className="relative mt-8 flex max-w-150 flex-wrap justify-center gap-2"
				>
					{TECH.map(tech => (
						<li
							key={tech}
							className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gray-400 uppercase transition-colors hover:border-[#fda085]/60 hover:text-white"
						>
							{tech}
						</li>
					))}
				</motion.ul>
			</header>
			<section className="mx-auto w-full px-4 lg:w-230 lg:px-8">
				<ul className="-mx-4 grid grid-cols-1 border-t border-line md:grid-cols-2 lg:-mx-8">
					<Project project={FEATURED_PROJECT} is_featured />
					{PROJECTS.map((project, index) => (
						<Project key={project.title} project={project} index={index + 1} />
					))}
				</ul>
			</section>
		</>
	)
}
