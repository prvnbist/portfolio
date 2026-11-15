import { cn } from '@/utils'

const PATHS = {
	'arrow-up-right': ['M7 17 17 7M8 7h9v9'],
	'arrow-right': ['M5 12h13M12 5l7 7-7 7'],
	'arrow-left': ['M19 12H6M12 5l-7 7 7 7'],
	link: [
		'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
		'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
	],
} as const

export type IconName = keyof typeof PATHS

/**
 * A decorative stroke icon in currentColor, hidden from assistive tech: the control it sits in
 * must carry the accessible name. Size it with Tailwind (default size-5).
 */
export const Icon = ({ name, className }: { name: IconName; className?: string }) => (
	<svg
		aria-hidden="true"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={cn('size-5 shrink-0', className)}
	>
		{PATHS[name].map(d => (
			<path key={d} d={d} />
		))}
	</svg>
)
