import { accentAt } from '@/lib/accents'
import { cn } from '@/utils'

/**
 * The blurred accent glow in a card's top-right corner. The card needs `relative overflow-hidden`
 * and the `group/card` class. `hover` shows it only on hover; `rest` keeps it faintly visible.
 */
export const CardGlow = ({
	index,
	mode = 'hover',
	className,
}: {
	index: number
	mode?: 'hover' | 'rest'
	className?: string
}) => (
	<span
		aria-hidden="true"
		className={cn(
			'pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500 group-hover/card:opacity-100',
			mode === 'hover' ? 'opacity-0' : 'opacity-40',
			accentAt(index).glow,
			className
		)}
	/>
)
