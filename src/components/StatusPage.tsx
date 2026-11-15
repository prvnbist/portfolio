import { type ErrorComponentProps, Link, useRouter } from '@tanstack/react-router'
import type { ReactNode } from 'react'

const actionClass =
	'inline-flex h-10 items-center rounded-full border border-white/10 px-5 text-sm text-white no-underline transition-colors hover:border-accent-to/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-to'

const StatusPage = ({
	code,
	title,
	children,
}: {
	code: string
	title: string
	children: ReactNode
}) => (
	<section className="relative mx-auto flex w-full flex-col items-center overflow-hidden px-4 pt-28 pb-24 text-center lg:w-230">
		<p className="font-code text-sm text-gray-400">
			<span className="text-emerald-400">~/praveen-bisht</span> $ echo $?{' '}
			<span className="text-white">{code}</span>
		</p>
		<h1 className="mt-4 bg-linear-to-b from-accent-from to-accent-to bg-clip-text pb-2 font-stack text-5xl font-bold tracking-tight text-transparent md:text-7xl">
			{title}
		</h1>
		<div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>
	</section>
)

export const NotFound = ({
	title = 'Page not found',
	back = { to: '/', label: 'Go home' },
}: {
	title?: string
	back?: { to: '/' | '/blog' | '/code'; label: string }
}) => (
	<StatusPage code="404" title={title}>
		<Link to={back.to} className={actionClass}>
			{back.label}
		</Link>
	</StatusPage>
)

export const ErrorPage = ({ reset }: ErrorComponentProps) => {
	const router = useRouter()
	return (
		<StatusPage code="500" title="Something went wrong">
			<button
				type="button"
				className={`${actionClass} cursor-pointer bg-transparent`}
				onClick={() => {
					reset()
					router.invalidate()
				}}
			>
				Try again
			</button>
			<Link to="/" className={actionClass}>
				Go home
			</Link>
		</StatusPage>
	)
}
