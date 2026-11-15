import { createFileRoute } from '@tanstack/react-router'
import { pageTitle } from '@/config/site'
import { seo } from '@/lib/seo'

import { Articles, Search, Tags } from '@/app/blog/components'
import { PageContainer, PageHero } from '@/components/layout'
import { getBlogIndex } from '@/lib/articles'
import { parseBlogSearch } from '@/lib/blog-search'

export const Route = createFileRoute('/blog/')({
	validateSearch: parseBlogSearch,
	loaderDeps: ({ search: { s, tag } }) => ({ s, tag }),
	loader: ({ deps }) => getBlogIndex({ data: deps }),
	head: () =>
		seo({
			path: '/blog',
			title: pageTitle('Blog'),
			description:
				"Sometimes I like to write about what I've learned and you can find them here.",
		}),
	component: Blog,
})

function Blog() {
	const data = Route.useLoaderData()
	const { s, tag } = Route.useSearch()
	return (
		<>
			<PageHero
				command="ls articles/ | wc -l"
				title="Articles"
				srSuffix=": things I've learned and written about"
			/>
			<PageContainer>
				<Search value={s} />
				<Tags tags={data.tags} activeTag={tag} />
				<Articles articles={data.articles} />
			</PageContainer>
		</>
	)
}
