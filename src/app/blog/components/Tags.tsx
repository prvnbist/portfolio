import { Link } from '@tanstack/react-router'

import type { BlogSearch } from '@/lib/articles.types'
import { cn } from '@/utils'

/** Next search params when a tag is chosen: select it, or clear it if it's already active. */
export const toggleTag = (prev: BlogSearch, tag: string): BlogSearch => ({
	...prev,
	tag: prev.tag === tag ? undefined : tag,
})

const Tags = ({ tags, activeTag }: { tags: string[]; activeTag?: string }) => (
	<nav aria-label="Filter articles by tag" className="mt-5">
		<ul className="flex flex-wrap gap-2">
			{tags.map(tag => {
				const active = activeTag === tag
				return (
					<li key={tag} className="inline-flex">
						<Link
							from="/blog/"
							to="/blog"
							search={prev => toggleTag(prev, tag)}
							// Without `exact`, the router treats the active tag's "clear" link as a
							// partial search match and overrides this with aria-current="page".
							activeOptions={{ exact: true }}
							aria-current={active ? 'true' : undefined}
							className={cn(
								'inline-flex rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gray-400 uppercase transition-colors hover:border-[#fda085]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fda085]',
								active &&
									'border-transparent bg-linear-to-r from-[#f6d365] to-[#fda085] text-zinc-950 hover:text-zinc-950'
							)}
						>
							{tag}
						</Link>
					</li>
				)
			})}
		</ul>
	</nav>
)

export default Tags
