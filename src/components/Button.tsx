import type { ReactNode } from 'react'

import { cn } from '@/utils'

type TextProps = {
	children: ReactNode
	variant?: 'outline'
}

const Button = {
	Cta: (props: {
		children: ReactNode
		href: string
		external?: boolean
		variant?: 'primary' | 'secondary'
		size?: 'md' | 'sm'
	}) => (
		<a
			href={props.href}
			{...(props.external && { target: '_blank', rel: 'noopener noreferrer' })}
			className={cn(
				'group inline-flex items-center justify-center rounded-full font-stack font-normal no-underline transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fda085]',
				props.size === 'sm' ? 'h-9 px-5 text-sm' : 'h-12 min-w-37 px-8 text-lg',
				props.variant === 'secondary'
					? 'border border-[#fda085]/40 bg-zinc-950 text-white hover:border-[#fda085]'
					: 'bg-linear-to-r from-[#f6d365] from-[3.5%] to-[#fda085] to-96% text-zinc-950 shadow-[0_0_21px_-6px_#fab976] hover:brightness-110'
			)}
		>
			{props.children}
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={cn(
					'ml-0 max-w-0 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100',
					props.size === 'sm'
						? 'size-3.5 group-hover:ml-1.5 group-hover:max-w-3.5'
						: 'size-5 group-hover:ml-2 group-hover:max-w-5'
				)}
			>
				<path d="M7 17 17 7M8 7h9v9" />
			</svg>
		</a>
	),

	Text: (props: TextProps) => {
		return (
			<button
				type="button"
				className="text-gray-900 bg-linear-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-linear-to-br focus:ring-4 focus:outline-hidden focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-[400] rounded-lg text-sm px-5 py-2.5"
			>
				{props.children}
			</button>
		)
	},
}

export default Button
