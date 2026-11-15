import { CardGlow, Hash, Pill, pillClass, Reveal } from '@/components/ui'
import { cn } from '@/utils'

import Button from './Button'

export type ProjectAction = { label: string; href: string }

type ProjectCardProps = {
	title: string
	description: string
	image: string
	/** Intrinsic size, so the browser can reserve space before the image loads. */
	imageWidth: number
	imageHeight: number
	/** Thumbnail shape: code screenshots are 4:3, design shots 16:9. */
	aspect?: '4/3' | 'video'
	tags?: readonly string[]
	/** External links; the first is the primary button, the rest secondary. */
	actions?: readonly ProjectAction[]
	/** Spans both grid columns with the image beside the text. */
	featured?: boolean
	/** Picks the card's accent glow. */
	index?: number
}

/** One project in the two-column card grid on /code and /design. */
export default function ProjectCard({
	title,
	description,
	image,
	imageWidth,
	imageHeight,
	aspect = '4/3',
	tags = [],
	actions = [],
	featured = false,
	index = 0,
}: ProjectCardProps) {
	return (
		<Reveal
			as="li"
			className={cn(
				'group/card relative list-none overflow-hidden border-b border-line px-4 py-8 lg:px-8',
				featured
					? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-8'
					: 'md:odd:border-r md:odd:border-line'
			)}
		>
			<CardGlow index={index} mode="rest" className="h-56 w-56" />
			<div
				className={cn(
					'relative overflow-hidden rounded-md border border-white/10',
					aspect === 'video' ? 'aspect-video' : 'aspect-[4/3]'
				)}
			>
				<img
					alt={title}
					src={image}
					width={imageWidth}
					height={imageHeight}
					loading="lazy"
					decoding="async"
					className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
				/>
			</div>
			<div className={cn('relative mt-5', featured && 'md:mt-0 md:self-center')}>
				{featured && <Pill className="mb-3">Featured</Pill>}
				<h2 className="font-stack text-3xl font-medium">{title}</h2>
				<p className="mt-2 mb-4 text-gray-400">{description}</p>
				{tags.length > 0 && (
					<ul className="mb-5 flex flex-wrap gap-2">
						{tags.map(tag => (
							<li
								key={tag}
								title={tag}
								className={pillClass({ variant: 'subtle', mono: true })}
							>
								<Hash />
								{tag}
							</li>
						))}
					</ul>
				)}
				{actions.length > 0 && (
					<div className="flex gap-3">
						{actions.map((action, i) => (
							<Button
								key={action.href}
								size="sm"
								external
								href={action.href}
								variant={i === 0 ? 'primary' : 'secondary'}
							>
								{action.label}
							</Button>
						))}
					</div>
				)}
			</div>
		</Reveal>
	)
}
