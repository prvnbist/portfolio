import { Link } from '@tanstack/react-router'

import { buttonClass } from '@/components/Button'
import { CardGlow, Icon, Reveal } from '@/components/ui'
import type { ArticleMeta } from '@/lib/articles.types'
import { formatDate } from '@/lib/format'

export const LATEST_COUNT = 3

export default function LatestWriting({ articles }: { articles: ArticleMeta[] }) {
	const latest = articles.slice(0, LATEST_COUNT)
	if (latest.length === 0) return null
	return (
		<section
			aria-labelledby="latest-writing"
			className="mx-auto w-full px-4 pt-16 lg:w-230 lg:px-8"
		>
			<div className="flex items-end justify-between gap-4">
				<h2 id="latest-writing" className="font-stack text-3xl font-medium">
					Latest posts
				</h2>
				<Link to="/blog" className={buttonClass({ variant: 'secondary', size: 'sm' })}>
					All posts
				</Link>
			</div>
			<ul className="-mx-4 mt-6 grid border-t border-line md:grid-cols-3 lg:-mx-8">
				{latest.map((article, index) => (
					<Reveal
						as="li"
						key={article.slug}
						delay={index * 0.08}
						className="group/card relative list-none overflow-hidden border-b border-line md:border-r md:last:border-r-0"
					>
						<CardGlow index={index} />
						<Link
							to="/blog/$slug"
							params={{ slug: article.slug }}
							className="relative flex h-full flex-col gap-3 px-4 py-6 no-underline lg:px-8"
						>
							{article.date && (
								<span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
									{formatDate(article.date)}
								</span>
							)}
							<h3 className="font-stack text-xl font-medium text-white">{article.title}</h3>
							<Icon
								name="arrow-up-right"
								className="mt-auto size-5 self-end text-accent-to opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
							/>
						</Link>
					</Reveal>
				))}
			</ul>
		</section>
	)
}
