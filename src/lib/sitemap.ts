import { absoluteUrl } from './seo'

type Entry = { loc: string; lastmod?: string }

const escapeXml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Home, the nav pages and every article. Only articles get a lastmod (their publish date), since
 * there is no honest last-modified date for the static pages.
 */
export const sitemapEntries = (
	navPaths: readonly string[],
	articles: readonly { slug: string; date: string | null }[]
): Entry[] => [
	{ loc: absoluteUrl('/') },
	...navPaths.map(path => ({ loc: absoluteUrl(path) })),
	...articles.map(({ slug, date }) => ({
		loc: absoluteUrl(`/blog/${slug}`),
		...(date && { lastmod: date.slice(0, 10) }),
	})),
]

export const buildSitemap = (entries: Entry[]) =>
	`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
		.map(
			e =>
				`<url><loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`
		)
		.join('\n')}\n</urlset>\n`
