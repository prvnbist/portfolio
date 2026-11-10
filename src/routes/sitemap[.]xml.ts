import { createFileRoute } from '@tanstack/react-router'

import { listSlugs } from '@/lib/articles.server'
import { SITE } from '@/lib/seo'

const STATIC = [
	{ path: '', priority: 1 },
	{ path: '/code', priority: 0.8 },
	{ path: '/design', priority: 0.8 },
	{ path: '/blog', priority: 0.8 },
]

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: () => {
				const lastmod = new Date().toISOString()
				const entries = [
					...STATIC.map(s => ({ ...s, loc: `${SITE}${s.path}` })),
					...listSlugs().map(slug => ({ loc: `${SITE}/blog/${slug}`, priority: 0.7 })),
				]
				const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
					.map(
						e =>
							`<url><loc>${e.loc}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${e.priority}</priority></url>`
					)
					.join('\n')}\n</urlset>\n`
				return new Response(xml, {
					headers: { 'content-type': 'application/xml; charset=utf-8' },
				})
			},
		},
	},
})
