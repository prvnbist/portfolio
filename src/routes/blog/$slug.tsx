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
		<div className="p-4 mx-auto max-w-[980px] w-full mt-6 text-center">
			<h1 className="text-3xl mb-2">Article not found</h1>
			<Link to="/blog" className="text-blue-500 hover:text-blue-700">
				Back to blog
			</Link>
		</div>
	),
	component: Article,
})

const navClass =
	'cursor-pointer flex items-center justify-between flex-1 border border-solid border-gray-700 p-4 rounded-lg hover:bg-[#202024]'

function Article() {
	const { meta, previous, next } = Route.useLoaderData()
	const Component = getArticleComponent(meta.slug)
	return (
		<div className="p-4 md:px-0 md:py-4 m-auto" style={{ maxWidth: '980px', width: '100%' }}>
			<main className="mt-6" id="article">
				<header className="mb-4 p-8 bg-dark-300 rounded-lg">
					<h1 className="text-3xl md:text-4xl mb-2">{meta.title}</h1>
					{meta.date && (
						<span className="text-lg text-gray-400">
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
								timeZone: 'UTC',
							}).format(new Date(meta.date))}
						</span>
					)}
					<ul className="mt-3 flex flex-wrap gap-2">
						{meta.tags.map(tag => (
							<li
								key={tag}
								className="font-light text-sm inline-flex bg-dark-200 rounded-full px-2 py-[2px] text-gray-400"
							>
								{tag}
							</li>
						))}
					</ul>
				</header>
				{Component && (
					<Suspense fallback={null}>
						<Content Component={Component} />
					</Suspense>
				)}
				<footer className="mt-4 flex flex-col md:flex-row gap-3">
					{previous ? (
						<Link to="/blog/$slug" params={{ slug: previous.slug }} className={navClass}>
							<ArrowLeft />
							<span className="text-white">{previous.title}</span>
						</Link>
					) : (
						<span className="flex-1" />
					)}
					{next ? (
						<Link to="/blog/$slug" params={{ slug: next.slug }} className={navClass}>
							<span className="text-white">{next.title}</span>
							<ArrowRight />
						</Link>
					) : (
						<span className="flex-1" />
					)}
				</footer>
			</main>
		</div>
	)
}

const ArrowRight = () => (
	<span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#ffffff"
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
	<span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#ffffff"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Arrow Left</title>
			<path d="M19 12H6M12 5l-7 7 7 7" />
		</svg>
	</span>
)
