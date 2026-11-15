import { Link } from '@tanstack/react-router'

import { pillClass } from '@/components/ui'
import type { BlogSearch } from '@/lib/articles.types'

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
							className={pillClass({
								variant: active ? 'accent' : 'default',
								interactive: true,
							})}
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
