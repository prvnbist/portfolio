import { Link } from '@tanstack/react-router'

import { NAME, NAV } from '@/config/site'

// py-1 keeps each link's target at least 24px tall (WCAG 2.5.8).
const linkClass =
	'inline-flex items-center py-1 font-inter text-sm font-medium text-zinc-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-to'

// The router sets aria-current="page" on the active link; this adds the visual cue.
const activeProps = {
	className: 'text-white underline decoration-accent-to decoration-2 underline-offset-8',
}

const NavLink = ({ title, url }: (typeof NAV)[number]) => (
	<Link to={url} className={linkClass} activeProps={activeProps}>
		{title}
	</Link>
)

// Links sit either side of the name: the first half on the left, the rest on the right.
const SPLIT = Math.ceil(NAV.length / 2)

const Navbar = () => {
	return (
		<nav aria-label="Main" className="sticky top-0 z-1000 w-full border-b border-line bg-bg">
			{/* Below sm the name gets its own row and the links share the row beneath it. */}
			<div className="mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2 sm:h-15 sm:flex-nowrap sm:gap-20 sm:py-0 lg:w-230 lg:border-x lg:border-line lg:px-0">
				<div className="flex gap-8 lg:gap-24 lg:pl-30">
					{NAV.slice(0, SPLIT).map(link => (
						<NavLink key={link.url} {...link} />
					))}
				</div>
				<Link
					to="/"
					title="Home"
					activeOptions={{ exact: true }}
					className="order-first w-full text-center font-stack text-2xl font-semibold text-white no-underline sm:order-none sm:w-auto"
				>
					{NAME}
				</Link>
				<div className="flex justify-end gap-8 lg:gap-24 lg:pr-30">
					{NAV.slice(SPLIT).map(link => (
						<NavLink key={link.url} {...link} />
					))}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
