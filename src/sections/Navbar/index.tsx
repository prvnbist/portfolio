import { Link } from '@tanstack/react-router'

const LINKS = [
	{ title: 'code.', url: '/code' },
	{ title: 'articles.', url: '/blog' },
]

const linkClass = 'font-inter text-sm font-medium text-zinc-300 transition hover:text-white'

const Navbar = () => {
	return (
		<nav className="sticky top-0 z-1000 w-full border-b border-line bg-zinc-950">
			<div className="mx-auto h-15 flex gap-20 items-center justify-center px-4 lg:w-230 lg:border-x lg:border-line lg:px-0">
				<div className="flex gap-8 lg:gap-24 lg:pl-30">
					{LINKS.slice(0, 1).map(link => (
						<Link key={link.url} to={link.url} className={linkClass}>
							{link.title}
						</Link>
					))}
				</div>
				<Link
					to="/"
					title="Home"
					className="font-stack text-2xl font-semibold text-white no-underline"
				>
					Praveen Bisht
				</Link>
				<div className="flex justify-end gap-8 lg:gap-24 lg:pr-30">
					{LINKS.slice(1).map(link => (
						<Link key={link.url} to={link.url} className={linkClass}>
							{link.title}
						</Link>
					))}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
