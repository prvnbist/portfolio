import type { ReactNode } from 'react'

import { Reveal } from '@/components/ui'
import { cn } from '@/utils'

const TITLE = {
	display:
		'mt-4 bg-linear-to-b from-accent-from via-accent-to to-transparent pb-2 text-[clamp(56px,15vw,150px)] leading-[0.9] select-none',
	title: 'mt-5 max-w-184 bg-linear-to-b from-white via-white to-accent-to pb-1 text-4xl leading-tight md:text-6xl',
}

/**
 * Page header: two pulsing glows, a terminal-style prompt line, a gradient h1 and optional extra
 * content (tags, a tech list). `srSuffix` extends the h1 for screen readers only.
 */
export const PageHero = ({
	command,
	title,
	srSuffix,
	size = 'display',
	glows = ['bg-sky-400/20', 'bg-pink-400/20'],
	truncateCommand = false,
	className,
	children,
}: {
	command: ReactNode
	title: ReactNode
	srSuffix?: string
	size?: keyof typeof TITLE
	glows?: [string, string]
	truncateCommand?: boolean
	className?: string
	children?: ReactNode
}) => (
	<header
		className={cn(
			'relative mx-auto flex w-full flex-col items-center overflow-hidden px-4 pt-28 pb-16 text-center lg:w-230',
			className
		)}
	>
		<span
			aria-hidden="true"
			className={cn(
				'pointer-events-none absolute top-10 left-1/4 h-64 w-64 rounded-full blur-3xl motion-safe:animate-pulse',
				glows[0]
			)}
		/>
		<span
			aria-hidden="true"
			className={cn(
				'pointer-events-none absolute top-24 right-1/4 h-64 w-64 rounded-full blur-3xl motion-safe:animate-pulse [animation-delay:1s]',
				glows[1]
			)}
		/>
		<Reveal
			as="p"
			when="mount"
			className={cn(
				'relative font-code text-sm text-gray-500',
				truncateCommand && 'max-w-full truncate'
			)}
		>
			<span className="text-emerald-400">~/prvnbist</span> $ {command}
		</Reveal>
		<Reveal
			as="h1"
			when="mount"
			className={cn(
				'relative bg-clip-text font-stack font-bold tracking-tight text-transparent',
				TITLE[size]
			)}
		>
			{title}
			{srSuffix && <span className="sr-only">{srSuffix}</span>}
		</Reveal>
		{children && (
			<Reveal when="mount" className="relative">
				{children}
			</Reveal>
		)}
	</header>
)
