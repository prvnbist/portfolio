import { cn } from '@/utils/cn'

type ProjectCardProps = {
	title: string
	className?: string
	period: { start: string; end: string }
	description: string
	image: string
	link: string
	layout?: 'grid' | 'stacked'
	productHunt?: string
}

const ProjectCard = ({
	title,
	className,
	period,
	description,
	image,
	link,
	layout = 'grid',
	productHunt = '',
}: ProjectCardProps) => {
	const isGrid = layout === 'grid'

	return (
		<div
			className={cn(
				'overflow-hidden bg-zinc-800 rounded-lg p-6',
				isGrid ? 'flex flex-col md:grid md:grid-cols-2 md:gap-6' : 'flex flex-col',
				className
			)}
		>
			<img
				className={cn('rounded-lg shadow-lg', isGrid ? 'mb-8 md:mb-0 h-full' : 'mb-8 h-full')}
				src={image}
				alt={title}
			/>
			<div className="flex flex-col">
				<h3 className="z-10 mb-2 font-serif text-2xl">{title}</h3>
				<span className="text-zinc-400 italic">
					{period.start} - {period.end}
				</span>
				<p className="z-10 mt-2 mb-5 text-lg text-zinc-400">{description}</p>
				<div className="flex gap-4">
					<a
						className={cn(
							'self-start px-3 h-10 rounded-md',
							'inline-flex items-center',
							'border border-yellow-300 !text-yellow-300',
							'font-serif text-sm',
							'hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.78,_0,_0.22,_1)]'
						)}
						href={link}
						rel="noopener noreferrer"
						target="__blank"
						title="Visit"
					>
						Visit
					</a>
					{productHunt && (
						<a
							className={cn(
								'self-start px-3 h-10 rounded-md',
								'inline-flex items-center',
								'bg-red-400 !text-white',
								'font-serif text-sm',
								'hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.78,_0,_0.22,_1)]'
							)}
							href={productHunt}
							rel="noopener noreferrer"
							target="__blank"
							title="Product Hunt"
						>
							Product Hunt
						</a>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
