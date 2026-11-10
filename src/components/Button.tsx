import type { ReactNode } from 'react'

type TextProps = {
	children: ReactNode
	variant?: 'outline'
}

const Button = {
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
