import { Link, useRouterState } from '@tanstack/react-router'

import { NAME, NAV } from '@/config/site'

// Terminal-style navbar: the name is a shell path ending in the current section, and the
// links read like `./code`. The `~/`, the section, the `./` prefixes and the cursor are
// decorative (aria-hidden), so screen readers hear "praveen-bisht", "code", "design", "blog".

// py-1 keeps each link's target at least 24px tall (WCAG 2.5.8).
const linkClass =
	'group inline-flex items-center py-1 text-zinc-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-to'

// The router sets aria-current="page" on the active link; this adds the visual cue.
const activeProps = { className: 'text-white' }

const slug = (path: string) => path.replace(/[^a-z0-9]+/gi, '-').toLowerCase()

const Navbar = () => {
	const pathname = useRouterState({ select: s => s.location.pathname })
	const section = NAV.find(link => pathname === link.url || pathname.startsWith(`${link.url}/`))

	return (
		<nav aria-label="Main" className="sticky top-0 z-1000 w-full border-b border-line bg-bg">
			{/* Below sm the path and the links stack; from sm they sit at either end. */}
			<div className="mx-auto flex flex-col items-start gap-1 px-4 py-2 font-code text-sm sm:h-15 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 lg:w-230 lg:border-x lg:border-line">
				<Link
					to="/"
					title="Home"
					activeOptions={{ exact: true }}
					className="inline-flex items-center py-1 text-white no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-to"
				>
					<span aria-hidden="true" className="text-accent-to">
						~/
					</span>
					<span className="font-semibold">{slug(NAME)}</span>
					{section && (
						<span aria-hidden="true" className="text-zinc-400">
							/{section.title}
						</span>
					)}
					<span
						aria-hidden="true"
						className="ml-0.5 inline-block h-4 w-2 bg-accent-to motion-safe:animate-pulse"
					/>
				</Link>
				<ul className="flex gap-6">
					{NAV.map(({ title, url }) => (
						<li key={url}>
							<Link to={url} className={linkClass} activeProps={activeProps}>
								<span
									aria-hidden="true"
									className="text-zinc-600 group-aria-[current=page]:text-accent-to"
								>
									./
								</span>
								{title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
