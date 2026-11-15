import { createFileRoute } from '@tanstack/react-router'
import { pageTitle } from '@/config/site'
import { motion } from 'framer-motion'
import { canonical } from '@/lib/seo'

import { Articles, Search, Tags } from '@/app/blog/components'
import { getBlogIndex } from '@/lib/articles'
import { parseBlogSearch } from '@/lib/blog-search'

const seo = {
	url: 'https://www.prvnbist.com/blog',
	title: pageTitle('Blog'),
	description: "Sometimes I like to write about what I've learned and you can find them here.",
	keywords:
		'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
}

export const Route = createFileRoute('/blog/')({
	validateSearch: parseBlogSearch,
	loaderDeps: ({ search: { s, tag } }) => ({ s, tag }),
	loader: ({ deps }) => getBlogIndex({ data: deps }),
	head: () => ({
		links: canonical('/blog'),
		meta: [
			{ title: seo.title },
			{ name: 'description', content: seo.description },
			{ name: 'keywords', content: seo.keywords },
			{ name: 'application-name', content: seo.title },
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: seo.url },
			{ property: 'og:title', content: seo.title },
			{ property: 'og:description', content: seo.description },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:site', content: '@prvnbist' },
			{ name: 'twitter:title', content: seo.title },
			{ name: 'twitter:description', content: seo.description },
		],
	}),
	component: Blog,
})

const ANIMATE_PROPS = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
}

function Blog() {
	const data = Route.useLoaderData()
	const { s, tag } = Route.useSearch()
	return (
		<>
			<header className="relative mx-auto flex w-full flex-col items-center overflow-hidden px-4 pt-28 pb-16 text-center lg:w-230">
				<span
					aria-hidden="true"
					className="pointer-events-none absolute top-10 left-1/4 h-64 w-64 motion-safe:animate-pulse rounded-full bg-sky-400/20 blur-3xl"
				/>
				<span
					aria-hidden="true"
					className="pointer-events-none absolute top-24 right-1/4 h-64 w-64 motion-safe:animate-pulse rounded-full bg-pink-400/20 blur-3xl [animation-delay:1s]"
				/>
				<motion.p
					{...ANIMATE_PROPS}
					className="relative font-(family-name:--font-code) text-sm text-gray-500"
				>
					<span className="text-emerald-400">~/prvnbist</span> $ ls articles/ | wc -l
				</motion.p>
				<motion.h1
					{...ANIMATE_PROPS}
					className="relative mt-4 bg-linear-to-b from-[#f6d365] via-[#fda085] to-transparent bg-clip-text pb-2 font-stack text-[clamp(56px,15vw,150px)] leading-[0.9] font-bold tracking-tight text-transparent select-none"
				>
					Articles
					<span className="sr-only">: things I've learned and written about</span>
				</motion.h1>
			</header>
			<div className="mx-auto w-full px-4 lg:w-230 lg:px-8">
				<Search value={s} />
				<Tags tags={data.tags} activeTag={tag} />
				<Articles articles={data.articles} />
			</div>
		</>
	)
}
