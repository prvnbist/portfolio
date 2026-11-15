import { cn } from '@/utils'
import { useNavigate } from '@tanstack/react-router'

const Tags = ({ tags, activeTag }: { tags: string[]; activeTag?: string }) => {
	const navigate = useNavigate({ from: '/blog/' })

	const setTag = (tag: string) =>
		navigate({ search: prev => ({ ...prev, tag: tag === activeTag ? undefined : tag }) })

	return (
		<section className="mt-5 flex flex-col gap-3">
			<ul className="flex flex-wrap gap-2">
				{tags.map(tag => (
					<li
						key={tag}
						onClick={() => setTag(tag)}
						className={cn(
							'inline-flex cursor-pointer rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gray-400 uppercase transition-colors hover:border-[#fda085]/60 hover:text-white',
							activeTag === tag &&
								'border-transparent bg-linear-to-r from-[#f6d365] to-[#fda085] text-zinc-950 hover:text-zinc-950'
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
