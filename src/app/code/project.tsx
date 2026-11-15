import { Button } from '@/components'
import { CardGlow, Pill, pillClass, Reveal } from '@/components/ui'
import { cn } from '@/utils'

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
		<Reveal
			as="li"
			className={cn(
				'group/card relative list-none overflow-hidden border-b border-line px-4 py-8 lg:px-8',
				is_featured
					? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-8'
					: 'md:odd:border-r md:odd:border-line'
			)}
		>
			<CardGlow index={index} mode="rest" className="h-56 w-56" />
			<div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10">
				<img
					alt={project.title}
					src={project.img_url}
					className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
				/>
			</div>
			<div className={cn('relative mt-5', is_featured && 'md:mt-0 md:self-center')}>
				{is_featured && <Pill className="mb-3">Featured</Pill>}
				<h2 className="font-stack text-3xl font-medium">{project.title}</h2>
				<p className="mt-2 mb-4 text-gray-400">{project.description}</p>
				{project.tech_stack.length > 0 && (
					<ul className="mb-5 flex flex-wrap gap-2">
						{project.tech_stack.map(tech => (
							<li key={tech} title={tech} className={pillClass({ variant: 'subtle' })}>
								{tech}
							</li>
						))}
					</ul>
				)}
				{(project.demo_url || project.code_url) && (
					<div className="flex gap-3">
						{project.demo_url && (
							<Button size="sm" external href={project.demo_url}>
								Demo
							</Button>
						)}
						{project.code_url && (
							<Button
								size="sm"
								external
								href={project.code_url}
								variant={project.demo_url ? 'secondary' : 'primary'}
							>
								Code
							</Button>
						)}
					</div>
				)}
			</div>
		</Reveal>
	)
}
