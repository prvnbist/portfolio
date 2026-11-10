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
							'font-light text-sm cursor-pointer inline-flex bg-dark-200 rounded-full px-2 py-[2px] text-gray-400',
							activeTag === tag && 'text-black bg-yellow-400'
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
