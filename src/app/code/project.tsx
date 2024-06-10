'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { cn } from '@/utils'

const BUTTON_PRIMARY =
	'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-800 shadow-lg shadow-lime-800/80 font-[400] rounded-lg text-sm px-5 py-2.5'

const BUTTON_SECONDARY =
	'border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 hover:border-gray-600 focus:ring-gray-700 font-[400]'

const ANIMATE_PROPS = {
	initial: { opacity: 0, y: 60 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
	viewport: { once: true },
}

type ProjectProps = {
	is_featured?: boolean
	project: {
		img_url: string
		title: string
		description: string
		demo_url?: string
		code_url?: string
		tech_stack: Array<string>
	}
}

export default function Project({ project, is_featured = false }: ProjectProps) {
	return (
		<motion.li
			{...ANIMATE_PROPS}
			className={cn('list-none', is_featured && 'md:grid md:grid-cols-2 md:gap-8')}
		>
			<header className="border border-dark-200 aspect-[4/3] rounded-md overflow-hidden">
				<img alt={project.title} src={project.img_url} />
			</header>
			<main className="mt-3">
				<h2 className="text-xl">{project.title}</h2>
				<p className="mt-1 mb-3">{project.description}</p>
				<ul className="flex gap-2 flex-wrap mb-3">
					{project.tech_stack.map(tech => (
						<li
							key={tech}
							title={tech}
							className="border border-dark-200 rounded px-2 py-[0.5px] text-[13px] font-[200]"
						>
							{tech}
						</li>
					))}
				</ul>
				{(project.demo_url || project.code_url) && (
					<div className="flex gap-3">
						{project.demo_url && (
							<Link target="_blank" href={project.demo_url} className={BUTTON_PRIMARY}>
								Demo
							</Link>
						)}
						{project.code_url && (
							<Link
								target="_blank"
								href={project.code_url}
								className={project.demo_url ? BUTTON_SECONDARY : BUTTON_PRIMARY}
							>
								Code
							</Link>
						)}
					</div>
				)}
			</main>
		</motion.li>
	)
}
