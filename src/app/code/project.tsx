import { motion } from 'framer-motion'

import { Button } from '@/components'
import { cn } from '@/utils'

const ANIMATE_PROPS = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
	viewport: { once: true },
}

const GLOWS = ['bg-yellow-400/20', 'bg-pink-400/20', 'bg-sky-400/20', 'bg-emerald-400/20']

type ProjectProps = {
	is_featured?: boolean
	index?: number
	project: {
		img_url: string
		title: string
		description: string
		demo_url?: string
		code_url?: string
		tech_stack: Array<string>
	}
}

export default function Project({ project, index = 0, is_featured = false }: ProjectProps) {
	return (
		<motion.li
			{...ANIMATE_PROPS}
			className={cn(
				'group/card relative list-none overflow-hidden border-b border-line px-4 py-8 lg:px-8',
				is_featured
					? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-8'
					: 'md:odd:border-r md:odd:border-line'
			)}
		>
			<span
				aria-hidden="true"
				className={cn(
					'pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover/card:opacity-100',
					GLOWS[index % GLOWS.length]
				)}
			/>
			<div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10">
				<img
					alt={project.title}
					src={project.img_url}
					className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
				/>
			</div>
			<div className={cn('relative mt-5', is_featured && 'md:mt-0 md:self-center')}>
				{is_featured && (
					<span className="mb-3 inline-block rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
						Featured
					</span>
				)}
				<h2 className="font-stack text-3xl font-medium">{project.title}</h2>
				<p className="mt-2 mb-4 text-gray-400">{project.description}</p>
				{project.tech_stack.length > 0 && (
					<ul className="mb-5 flex flex-wrap gap-2">
						{project.tech_stack.map(tech => (
							<li
								key={tech}
								title={tech}
								className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gray-400 uppercase"
							>
								{tech}
							</li>
						))}
					</ul>
				)}
				{(project.demo_url || project.code_url) && (
					<div className="flex gap-3">
						{project.demo_url && (
							<Button.Cta size="sm" external href={project.demo_url}>
								Demo
							</Button.Cta>
						)}
						{project.code_url && (
							<Button.Cta
								size="sm"
								external
								href={project.code_url}
								variant={project.demo_url ? 'secondary' : 'primary'}
							>
								Code
							</Button.Cta>
						)}
					</div>
				)}
			</div>
		</motion.li>
	)
}
