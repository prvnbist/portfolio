import { createFileRoute } from '@tanstack/react-router'
import { canonical } from '@/lib/seo'

import { Articles, Search, Tags } from '@/app/blog/components'
import { getBlogIndex } from '@/lib/cms'

const seo = {
	url: 'https://www.prvnbist.com/blog',
	title: 'Blog | Praveen Bisht | Frontend Engineer',
	description: "Sometimes I like to write about what I've learned and you can find them here.",
	keywords:
		'front end, back end, design, html, pug, css, scss, javascript, nodejs, reactjs, graphql, expressjs, mongoose, mongodb, gatsby, figma, design, user interface, user experience',
}

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v : undefined)

export const Route = createFileRoute('/blog/')({
	validateSearch: (search: Record<string, unknown>): { s?: string; tag?: string } => ({
		s: str(search.s),
		tag: str(search.tag),
	}),
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

function Blog() {
	const { data, error } = Route.useLoaderData()
	const { s, tag } = Route.useSearch()
	return (
		<div className="px-4 mt-8 md:px-0 mx-auto max-w-[980px] w-full">
			<Search value={s} />
			{error ? (
				<h4 className="mt-4 text-xl text-center text-gray-400">
					Articles are unavailable right now. Please try again later.
				</h4>
			) : (
				<>
					<Tags tags={data.tags} activeTag={tag} />
					<Articles articles={data.articles} />
				</>
			)}
		</div>
	)
}
