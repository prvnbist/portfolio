import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

import type { ArticleMeta } from '@/lib/articles.types'
import { formatDate } from '@/lib/format'

const GLOWS = ['bg-yellow-400/20', 'bg-pink-400/20', 'bg-sky-400/20', 'bg-emerald-400/20']

const Articles = ({ articles }: { articles: ArticleMeta[] }) => {
	return Array.isArray(articles) && articles.length > 0 ? (
		<ul className="-mx-4 mt-6 border-t border-line lg:-mx-8">
			{articles.map((article, index) => (
				<motion.li
					key={article.slug}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					viewport={{ once: true }}
					className="group/card relative list-none overflow-hidden border-b border-line"
				>
					<span
						aria-hidden="true"
						className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 ${GLOWS[index % GLOWS.length]}`}
					/>
					<Link
						to="/blog/$slug"
						params={{ slug: article.slug }}
						className="relative flex items-center justify-between gap-6 px-4 py-6 no-underline lg:px-8"
					>
						<div className="min-w-0">
							{article.date && (
								<span className="text-[11px] font-medium tracking-wider text-gray-500 uppercase">
									{formatDate(article.date)}
								</span>
							)}
							<h2 className="mt-1 font-stack text-2xl font-medium text-white">
								{article.title}
							</h2>
						</div>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="size-6 shrink-0 -translate-x-2 text-accent-to opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100"
						>
							<path d="M7 17 17 7M8 7h9v9" />
						</svg>
					</Link>
				</motion.li>
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
