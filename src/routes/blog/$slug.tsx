import { Suspense } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import Content from '@/app/blog/components/Content'
import { NotFound } from '@/components'
import { PageContainer, PageHero } from '@/components/layout'
import { Hash, Pill } from '@/components/ui'
import { NAME } from '@/config/site'
import { blogPostingSchema, jsonLd, seo } from '@/lib/seo'
import { getArticleComponent, getArticlePage, preloadArticle } from '@/lib/articles'
import { formatDate } from '@/lib/format'

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
		return {
			...seo({
				path: `/blog/${meta.slug}`,
				title: `${meta.title} | ${NAME}`,
				description: meta.description ?? '',
				image: meta.ogImage,
				type: 'article',
				extra: [
					...(meta.date ? [{ property: 'article:published_time', content: meta.date }] : []),
					// The router keeps one meta per property, so repeated article:tag tags would be
					// dropped; the tags are also in the BlogPosting JSON-LD as keywords.
					...(meta.tags.length
						? [{ property: 'article:tag', content: meta.tags.join(', ') }]
						: []),
				],
			}),
			scripts: [jsonLd(blogPostingSchema(meta))],
		}
	},
	notFoundComponent: () => (
		<NotFound title="Article not found" back={{ to: '/blog', label: 'Back to blog' }} />
	),
	component: Article,
})

const navClass =
	'group/card relative flex flex-1 items-center justify-between gap-4 overflow-hidden px-4 py-6 no-underline lg:px-8'

function Article() {
	const { meta, previous, next } = Route.useLoaderData()
	const Component = getArticleComponent(meta.slug)
	return (
		<>
			<PageHero
				size="title"
				command={`cat blog/${meta.slug}.mdx`}
				title={meta.title}
				truncateCommand
			>
				<div className="mt-6 flex flex-wrap items-center justify-center gap-2">
					{meta.date && <Pill variant="success">{formatDate(meta.date)}</Pill>}
					{meta.tags.map(tag => (
						<Pill key={tag} mono>
							<Hash />
							{tag}
						</Pill>
					))}
				</div>
			</PageHero>
			<PageContainer as="article" id="article">
				{Component && (
					<Suspense fallback={null}>
						<Content Component={Component} />
					</Suspense>
				)}
				<nav
					aria-label="More posts"
					className="-mx-4 mt-12 flex flex-col border-t border-line md:flex-row lg:-mx-8"
				>
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
				</nav>
			</PageContainer>
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
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			className="text-accent-to"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h13M12 5l7 7-7 7" />
		</svg>
	</span>
)

const ArrowLeft = () => (
	<span className="relative">
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			className="text-accent-to"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M19 12H6M12 5l-7 7 7 7" />
		</svg>
	</span>
)
