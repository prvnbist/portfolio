import type { ReactNode } from 'react'

type TextProps = {
	children: ReactNode
	variant?: 'outline'
}

const Button = {
	Cta: (props: { children: ReactNode; href: string }) => (
		<a
			href={props.href}
			className="group inline-flex h-12 w-37 items-center justify-center rounded-full bg-linear-to-r from-[#f6d365] from-[3.5%] to-[#fda085] to-[96%] font-stack text-lg font-normal text-zinc-950 no-underline shadow-[0_0_21px_-6px_#fab976] transition-all duration-300 hover:w-[11.1rem] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fda085]"
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
				className="ml-0 size-5 max-w-0 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-5 group-hover:translate-x-0 group-hover:opacity-100"
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
