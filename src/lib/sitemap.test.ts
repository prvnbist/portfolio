import { describe, expect, it } from 'vitest'

import { buildSitemap, sitemapEntries } from './sitemap'

describe('sitemapEntries', () => {
	it('lists home, the nav pages and articles dated by their frontmatter', () => {
		const entries = sitemapEntries(
			['/code', '/blog'],
			[
				{ slug: 'uses', date: '2020-01-12T00:00:00.000Z' },
				{ slug: 'undated', date: null },
			]
		)
		expect(entries).toEqual([
			{ loc: 'https://www.prvnbist.com' },
			{ loc: 'https://www.prvnbist.com/code' },
			{ loc: 'https://www.prvnbist.com/blog' },
			{ loc: 'https://www.prvnbist.com/blog/uses', lastmod: '2020-01-12' },
			{ loc: 'https://www.prvnbist.com/blog/undated' },
		])
	})
})

describe('buildSitemap', () => {
	const xml = buildSitemap([
		{ loc: 'https://www.prvnbist.com' },
		{ loc: 'https://www.prvnbist.com/blog/a&b', lastmod: '2020-01-12' },
	])

	it('writes lastmod only where known, and no changefreq or priority', () => {
		expect(xml).toContain('<url><loc>https://www.prvnbist.com</loc></url>')
		expect(xml).toContain('<lastmod>2020-01-12</lastmod>')
		expect(xml).not.toMatch(/changefreq|priority/)
	})

	it('escapes XML special characters', () => {
		expect(xml).toContain('/blog/a&amp;b')
	})

	it('is a urlset document', () => {
		expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
		expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
	})
})
