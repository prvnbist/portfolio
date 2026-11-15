import { Link } from '@tanstack/react-router'

import { NAME, NAV } from '@/config/site'

const linkClass =
	'font-inter text-sm font-medium text-zinc-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-to'

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
			<div className="mx-auto h-15 flex gap-20 items-center justify-center px-4 lg:w-230 lg:border-x lg:border-line lg:px-0">
				<div className="flex gap-8 lg:gap-24 lg:pl-30">
					{NAV.slice(0, SPLIT).map(link => (
						<NavLink key={link.url} {...link} />
					))}
				</div>
				<Link
					to="/"
					title="Home"
					activeOptions={{ exact: true }}
					className="font-stack text-2xl font-semibold text-white no-underline"
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
