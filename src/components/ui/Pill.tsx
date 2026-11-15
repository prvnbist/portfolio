import type { ReactNode } from 'react'

import { cn } from '@/utils'

type PillOptions = {
	variant?: 'default' | 'accent' | 'success' | 'subtle'
	/** Adds hover and keyboard-focus styles, for pills rendered as links or buttons. */
	interactive?: boolean
	className?: string
}

const VARIANTS = {
	default: 'border border-white/10 text-gray-400',
	accent: 'border border-transparent bg-linear-to-r from-accent-from to-accent-to text-zinc-950',
	success: 'border border-transparent bg-emerald-400/10 font-semibold text-emerald-400',
	subtle: 'bg-white/5 text-gray-400',
}

/** Classes for a small uppercase pill; use directly on a Link, or via <Pill>. */
export const pillClass = ({
	variant = 'default',
	interactive = false,
	className,
}: PillOptions = {}) =>
	cn(
		'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase',
		VARIANTS[variant],
		interactive &&
			'transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-to',
		interactive && variant === 'default' && 'hover:border-accent-to/60 hover:text-white',
		className
	)

export const Pill = ({ children, ...options }: PillOptions & { children: ReactNode }) => (
	<span className={pillClass(options)}>{children}</span>
)
