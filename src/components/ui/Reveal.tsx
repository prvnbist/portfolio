import { type HTMLMotionProps, m } from 'framer-motion'

const TAGS = {
	div: m.div,
	li: m.li,
	p: m.p,
	h1: m.h1,
	section: m.section,
} as const

type Tag = keyof typeof TAGS

type RevealProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView'> & {
	as?: Tag
	/** `view`: fade up when scrolled into view (once). `mount`: fade up on first render. */
	when?: 'view' | 'mount'
	delay?: number
	duration?: number
	y?: number
}

/**
 * Fade-and-rise entrance. With reduced motion preferred it shows its content at once:
 * MotionConfig reducedMotion="user" drops the movement and syncReducedMotion (src/lib/motion.ts)
 * skips the fade.
 */
export const Reveal = ({
	as = 'div',
	when = 'view',
	delay = 0,
	duration = 0.5,
	y = 20,
	transition,
	...props
}: RevealProps) => {
	const Component = TAGS[as] as typeof m.div
	const visible = { opacity: 1, y: 0 }
	return (
		<Component
			initial={{ opacity: 0, y }}
			{...(when === 'view'
				? { whileInView: visible, viewport: { once: true } }
				: { animate: visible })}
			transition={{ duration, delay, ...transition }}
			{...props}
		/>
	)
}
