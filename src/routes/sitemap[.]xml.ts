import { createFileRoute } from '@tanstack/react-router'

import { NAV } from '@/config/site'
import { fetchBlogIndex } from '@/lib/articles.server'
import { buildSitemap, sitemapEntries } from '@/lib/sitemap'

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: () => {
				const xml = buildSitemap(
					sitemapEntries(
						NAV.map(link => link.url),
						fetchBlogIndex({}).articles
					)
				)
				return new Response(xml, {
					headers: { 'content-type': 'application/xml; charset=utf-8' },
				})
			},
		},
	},
})
