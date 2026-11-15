import { Link } from '@tanstack/react-router'

import { CardGlow, Icon, Reveal } from '@/components/ui'
import type { ArticleMeta } from '@/lib/articles.types'
import { formatDate } from '@/lib/format'

const Articles = ({ articles }: { articles: ArticleMeta[] }) => {
	return Array.isArray(articles) && articles.length > 0 ? (
		<ul className="-mx-4 mt-6 border-t border-line lg:-mx-8">
			{articles.map((article, index) => (
				<Reveal
					as="li"
					key={article.slug}
					duration={0.4}
					className="group/card relative list-none overflow-hidden border-b border-line"
				>
					<CardGlow index={index} />
					<Link
						to="/blog/$slug"
						params={{ slug: article.slug }}
						className="relative flex items-center justify-between gap-6 px-4 py-6 no-underline lg:px-8"
					>
						<div className="min-w-0">
							{article.date && (
								<span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
									{formatDate(article.date)}
								</span>
							)}
							<h2 className="mt-1 font-stack text-2xl font-medium text-white">
								{article.title}
							</h2>
						</div>
						<Icon
							name="arrow-up-right"
							className="size-6 -translate-x-2 text-accent-to opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100"
						/>
					</Link>
				</Reveal>
			))}
		</ul>
	) : (
		<div className="mt-12 flex flex-col items-center gap-4 text-center">
			<h2 className="font-stack text-3xl">No articles match</h2>
			<p className="text-gray-400">Try a different search or tag.</p>
			<Link
				to="/blog"
				className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition-colors hover:border-accent-to/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-to"
			>
				Clear filters
			</Link>
		</div>
	)
}

export default Articles
