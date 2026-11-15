import { DEFAULT_OG, GITHUB_URL, NAME, ROLE, SITE_URL, TWITTER, TWITTER_URL } from '@/config/site'

import type { ArticleMeta } from './articles.types'

export { SITE_URL as SITE }

/** Absolute URL for a site-relative path ('/' is the bare origin); absolute URLs pass through. */
export const absoluteUrl = (path: string) =>
	/^https?:\/\//.test(path) ? path : path === '/' ? SITE_URL : `${SITE_URL}${path}`

export const canonical = (path: string) => [{ rel: 'canonical', href: absoluteUrl(path || '/') }]

type Meta =
	| { title: string }
	| { name: string; content: string }
	| { property: string; content: string }

export type SeoInput = {
	/** Site-relative path of the page, e.g. '/code'. */
	path: string
	title: string
	description: string
	/** Site-relative or absolute; defaults to DEFAULT_OG. */
	image?: string | null
	type?: 'website' | 'article'
	/** Extra tags appended after the standard ones (e.g. article:published_time). */
	extra?: Meta[]
}

/** Every head tag a page needs: title, description, canonical, Open Graph and Twitter. */
export const seo = ({
	path,
	title,
	description,
	image,
	type = 'website',
	extra = [],
}: SeoInput) => {
	const url = absoluteUrl(path)
	const imageUrl = absoluteUrl(image || DEFAULT_OG)
	const meta: Meta[] = [
		{ title },
		{ name: 'description', content: description },
		{ property: 'og:type', content: type },
		{ property: 'og:url', content: url },
		{ property: 'og:title', content: title },
		{ property: 'og:description', content: description },
		{ property: 'og:image', content: imageUrl },
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:site', content: TWITTER },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
		{ name: 'twitter:image', content: imageUrl },
		...extra,
	]
	return { meta, links: canonical(path) }
}

/** A JSON-LD <script> for route head(). "<" is escaped so content can't close the tag. */
export const jsonLd = (data: Record<string, unknown>) => ({
	type: 'application/ld+json',
	children: JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c'),
})

const person = () => ({ '@type': 'Person', name: NAME, url: SITE_URL })

export const personSchema = () => ({
	...person(),
	jobTitle: ROLE,
	sameAs: [TWITTER_URL, GITHUB_URL],
})

export const websiteSchema = () => ({ '@type': 'WebSite', name: NAME, url: SITE_URL })

export const blogPostingSchema = (meta: ArticleMeta) => {
	const url = absoluteUrl(`/blog/${meta.slug}`)
	return {
		'@type': 'BlogPosting',
		headline: meta.title,
		description: meta.description,
		datePublished: meta.date,
		url,
		mainEntityOfPage: url,
		image: absoluteUrl(meta.ogImage || DEFAULT_OG),
		keywords: meta.tags.join(', '),
		author: person(),
	}
}
