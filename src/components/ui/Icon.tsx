import { cn } from '@/utils'

const PATHS = {
	'arrow-up-right': ['M7 17 17 7M8 7h9v9'],
	'arrow-right': ['M5 12h13M12 5l7 7-7 7'],
	'arrow-left': ['M19 12H6M12 5l-7 7 7 7'],
	link: [
		'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
		'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
	],
	github: [
		'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
	],
	x: ['M4 4l11.733 16H20L8.267 4z', 'M4 20l6.768-6.768m2.46-2.46L20 4'],
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
