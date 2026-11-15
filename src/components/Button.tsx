import type { ReactNode } from 'react'

import { cn } from '@/utils'

import { Icon } from './ui/Icon'

type Style = { variant?: 'primary' | 'secondary'; size?: 'md' | 'sm' }

type Common = Style & { children: ReactNode; className?: string }

type LinkButtonProps = Common & { href: string; external?: boolean; onClick?: never }

type ActionButtonProps = Common & { onClick: () => void; href?: never; external?: never }

export const buttonClass = ({ variant = 'primary', size = 'md' }: Style = {}) =>
	cn(
		'group inline-flex cursor-pointer items-center justify-center rounded-full font-stack font-normal no-underline transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-to',
		size === 'sm' ? 'h-9 px-5 text-sm' : 'h-12 min-w-37 px-8 text-lg',
		variant === 'secondary'
			? 'border border-accent-to/40 bg-bg text-white hover:border-accent-to'
			: 'bg-linear-to-r from-accent-from from-[3.5%] to-accent-to to-96% text-zinc-950 shadow-[0_0_21px_-6px_var(--color-accent-glow)] hover:brightness-110'
	)

/** The arrow that slides in on hover. */
const Arrow = ({ size }: Style) => (
	<Icon
		name="arrow-up-right"
		className={cn(
			'ml-0 max-w-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100',
			size === 'sm'
				? 'size-3.5 group-hover:ml-1.5 group-hover:max-w-3.5'
				: 'size-5 group-hover:ml-2 group-hover:max-w-5'
		)}
	/>
)

/** A link styled as a button when given `href`; a real <button> when given `onClick`. */
const Button = (props: LinkButtonProps | ActionButtonProps) => {
	const { variant, size, children } = props
	const className = cn(buttonClass({ variant, size }), props.className)
	if (props.href !== undefined)
		return (
			<a
				href={props.href}
				{...(props.external && { target: '_blank', rel: 'noopener noreferrer' })}
				className={className}
			>
				{children}
				<Arrow size={size} />
			</a>
		)
	return (
		<button type="button" onClick={props.onClick} className={className}>
			{children}
		</button>
	)
}

/** @deprecated Only used by the old /design cards; removed with them in T20. */
const LegacyTextButton = ({ children }: { children: ReactNode }) => (
	<button
		type="button"
		className="text-gray-900 bg-linear-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-linear-to-br focus:ring-4 focus:outline-hidden focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-[400] rounded-lg text-sm px-5 py-2.5"
	>
		{children}
	</button>
)

export default Object.assign(Button, { Text: LegacyTextButton })
