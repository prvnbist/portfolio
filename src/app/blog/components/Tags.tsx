import { cn } from '@/utils'
import { useNavigate } from '@tanstack/react-router'

const Tags = ({ tags, activeTag }: { tags: string[]; activeTag?: string }) => {
	const navigate = useNavigate({ from: '/blog/' })

	const setTag = (tag: string) =>
		navigate({ search: prev => ({ ...prev, tag: tag === activeTag ? undefined : tag }) })

	return (
		<section className="mt-4 mb-2 flex flex-col gap-3">
			<h3>Tags</h3>
			<ul className="flex flex-wrap gap-2">
				{tags.map(tag => (
					<li
						key={tag}
						onClick={() => setTag(tag)}
						className={cn(
							'inline-flex cursor-pointer rounded-full border border-line bg-dark-400 px-3 py-0.5 text-sm font-light text-zinc-400 transition-colors hover:text-white',
							activeTag === tag &&
								'border-transparent bg-linear-to-r from-[#f6d365] to-[#fda085] font-normal text-zinc-950 hover:text-zinc-950'
						)}
					>
						{tag}
					</li>
				))}
			</ul>
		</section>
	)
}

export default Tags
