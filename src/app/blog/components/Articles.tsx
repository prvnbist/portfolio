import { motion } from 'framer-motion'

import type { ArticleMeta } from '@/lib/articles.types'

const GLOWS = ['bg-yellow-400/20', 'bg-pink-400/20', 'bg-sky-400/20', 'bg-emerald-400/20']

const formatDate = (date: string) =>
	new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
		new Date(date)
	)

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
					<a
						href={`/blog/${article.slug}`}
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
							className="size-6 shrink-0 -translate-x-2 text-[#fda085] opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100"
						>
							<path d="M7 17 17 7M8 7h9v9" />
						</svg>
					</a>
				</motion.li>
			))}
		</ul>
	) : (
		<h4 className="mt-8 text-center font-stack text-3xl">No articles</h4>
	)
}

export default Articles
