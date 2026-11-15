import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import Content from '@/app/blog/components/Content'
import { canonical, SITE } from '@/lib/seo'
import { getArticleComponent, getArticlePage, preloadArticle } from '@/lib/articles'

export const Route = createFileRoute('/blog/$slug')({
	loader: async ({ params: { slug } }) => {
		const [page, exists] = await Promise.all([
			getArticlePage({ data: slug }),
			preloadArticle(slug),
		])
		if (!page || !exists) throw notFound()
		return page
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {}
		const { meta } = loaderData
		const title = `${meta.title} | Praveen Bisht`
		const url = `${SITE}/blog/${meta.slug}`
		const image = meta.ogImage ? [{ property: 'og:image', content: meta.ogImage }] : []
		const twImage = meta.ogImage ? [{ name: 'twitter:image', content: meta.ogImage }] : []
		const description = meta.description ?? ''
		return {
			links: canonical(`/blog/${meta.slug}`),
			meta: [
				{ title },
				{ name: 'description', content: description },
				{ name: 'keywords', content: meta.tags.join(', ') },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: url },
				{ property: 'og:title', content: title },
				{ property: 'og:description', content: description },
				...image,
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:site', content: '@prvnbist' },
				{ name: 'twitter:title', content: title },
				{ name: 'twitter:description', content: description },
				...twImage,
			],
		}
	},
	notFoundComponent: () => (
		<div className="p-4 mx-auto max-w-230 w-full mt-6 text-center">
			<h1 className="text-3xl mb-2">Article not found</h1>
			<Link to="/blog" className="text-blue-500 hover:text-blue-700">
				Back to blog
			</Link>
		</div>
	),
	component: Article,
})

const ANIMATE_PROPS = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
}

const navClass =
	'group/card relative flex flex-1 items-center justify-between gap-4 overflow-hidden px-4 py-6 no-underline lg:px-8'

function Article() {
	const { meta, previous, next } = Route.useLoaderData()
	const Component = getArticleComponent(meta.slug)
	return (
		<>
			<header className="relative mx-auto flex w-full flex-col items-center overflow-hidden px-4 pt-28 pb-16 text-center lg:w-230">
				<span
					aria-hidden="true"
					className="pointer-events-none absolute top-10 left-1/4 h-64 w-64 animate-pulse rounded-full bg-sky-400/20 blur-3xl"
				/>
				<span
					aria-hidden="true"
					className="pointer-events-none absolute top-24 right-1/4 h-64 w-64 animate-pulse rounded-full bg-pink-400/20 blur-3xl [animation-delay:1s]"
				/>
				<motion.p
					{...ANIMATE_PROPS}
					className="relative max-w-full truncate font-[family-name:var(--font-code)] text-sm text-gray-500"
				>
					<span className="text-emerald-400">~/prvnbist</span> $ cat articles/{meta.slug}.mdx
				</motion.p>
				<motion.h1
					{...ANIMATE_PROPS}
					className="relative mt-5 max-w-184 bg-linear-to-b from-white via-white to-[#fda085] bg-clip-text pb-1 font-stack text-4xl leading-tight font-bold tracking-tight text-transparent md:text-6xl"
				>
					{meta.title}
				</motion.h1>
				<motion.div
					{...ANIMATE_PROPS}
					className="relative mt-6 flex flex-wrap items-center justify-center gap-2"
				>
					{meta.date && (
						<span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
								timeZone: 'UTC',
							}).format(new Date(meta.date))}
						</span>
					)}
					{meta.tags.map(tag => (
						<span
							key={tag}
							className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gray-400 uppercase"
						>
							{tag}
						</span>
					))}
				</motion.div>
			</header>
			<main className="mx-auto w-full px-4 lg:w-230 lg:px-8" id="article">
				{Component && (
					<Suspense fallback={null}>
						<Content Component={Component} />
					</Suspense>
				)}
				<footer className="-mx-4 mt-12 flex flex-col border-t border-line md:flex-row lg:-mx-8">
					{previous ? (
						<Link
							to="/blog/$slug"
							params={{ slug: previous.slug }}
							className={`${navClass} border-b border-line md:border-r`}
						>
							<NavGlow />
							<ArrowLeft />
							<span className="relative text-right font-stack text-lg font-medium text-white">
								{previous.title}
							</span>
						</Link>
					) : (
						<span className="flex-1 border-b border-line md:border-r" />
					)}
					{next ? (
						<Link
							to="/blog/$slug"
							params={{ slug: next.slug }}
							className={`${navClass} border-b border-line`}
						>
							<NavGlow />
							<span className="relative font-stack text-lg font-medium text-white">
								{next.title}
							</span>
							<ArrowRight />
						</Link>
					) : (
						<span className="flex-1 border-b border-line" />
					)}
				</footer>
			</main>
		</>
	)
}

const NavGlow = () => (
	<span
		aria-hidden="true"
		className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-sky-400/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-100"
	/>
)

const ArrowRight = () => (
	<span className="relative">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#fda085"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Arrow Right</title>
			<path d="M5 12h13M12 5l7 7-7 7" />
		</svg>
	</span>
)

const ArrowLeft = () => (
	<span className="relative">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#fda085"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Arrow Left</title>
			<path d="M19 12H6M12 5l-7 7 7 7" />
		</svg>
	</span>
)
