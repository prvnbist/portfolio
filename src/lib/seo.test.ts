import { describe, expect, it } from 'vitest'

import { absoluteUrl, blogPostingSchema, jsonLd, personSchema, seo, websiteSchema } from './seo'

type Meta = Record<string, string>
const find = (meta: Meta[], key: string) =>
	meta.find(m => m.name === key || m.property === key)?.content

describe('absoluteUrl', () => {
	it('prefixes site-relative paths and leaves absolute URLs alone', () => {
		expect(absoluteUrl('/')).toBe('https://www.prvnbist.com')
		expect(absoluteUrl('/code')).toBe('https://www.prvnbist.com/code')
		expect(absoluteUrl('https://cdn.example.com/a.png')).toBe('https://cdn.example.com/a.png')
	})
})

describe('seo', () => {
	const head = seo({
		path: '/code',
		title: 'Code | Praveen Bisht | AI Engineer',
		description: 'Projects I have built.',
		image: '/images/thumbs/code.jpg',
	})

	it('adds a canonical link', () => {
		expect(head.links).toEqual([{ rel: 'canonical', href: 'https://www.prvnbist.com/code' }])
	})

	it('sets title, description, Open Graph and Twitter tags', () => {
		expect(head.meta[0]).toEqual({ title: 'Code | Praveen Bisht | AI Engineer' })
		expect(find(head.meta, 'description')).toBe('Projects I have built.')
		expect(find(head.meta, 'og:type')).toBe('website')
		expect(find(head.meta, 'og:url')).toBe('https://www.prvnbist.com/code')
		expect(find(head.meta, 'og:title')).toBe('Code | Praveen Bisht | AI Engineer')
		expect(find(head.meta, 'og:description')).toBe('Projects I have built.')
		expect(find(head.meta, 'twitter:card')).toBe('summary_large_image')
		expect(find(head.meta, 'twitter:site')).toBe('@prvnbist')
		expect(find(head.meta, 'twitter:title')).toBe('Code | Praveen Bisht | AI Engineer')
		expect(find(head.meta, 'twitter:description')).toBe('Projects I have built.')
	})

	it('uses an absolute image URL', () => {
		expect(find(head.meta, 'og:image')).toBe('https://www.prvnbist.com/images/thumbs/code.jpg')
		expect(find(head.meta, 'twitter:image')).toBe(
			'https://www.prvnbist.com/images/thumbs/code.jpg'
		)
	})

	it('falls back to the default share image and accepts a type', () => {
		const article = seo({ path: '/blog/x', title: 'X', description: 'Y', type: 'article' })
		expect(find(article.meta, 'og:image')).toBe('https://www.prvnbist.com/images/thumbs/home.jpg')
		expect(find(article.meta, 'og:type')).toBe('article')
	})

	it('drops keywords and application-name', () => {
		expect(find(head.meta, 'keywords')).toBeUndefined()
		expect(find(head.meta, 'application-name')).toBeUndefined()
	})
})

describe('JSON-LD', () => {
	it('serialises into an ld+json script and escapes "<"', () => {
		const script = jsonLd({ '@type': 'Thing', name: '</script><b>' })
		expect(script.type).toBe('application/ld+json')
		expect(script.children).not.toContain('<')
		expect(JSON.parse(script.children)).toEqual({
			'@context': 'https://schema.org',
			'@type': 'Thing',
			name: '</script><b>',
		})
	})

	it('describes the person and the website', () => {
		expect(personSchema()).toMatchObject({
			'@type': 'Person',
			name: 'Praveen Bisht',
			jobTitle: 'AI Engineer',
			url: 'https://www.prvnbist.com',
		})
		expect(websiteSchema()).toMatchObject({ '@type': 'WebSite', url: 'https://www.prvnbist.com' })
	})

	it('describes an article as a BlogPosting', () => {
		const post = blogPostingSchema({
			slug: 'uses',
			title: 'Things I use',
			date: '2020-01-12T00:00:00.000Z',
			description: 'My setup.',
			tags: ['tech', 'setup'],
			ogImage: null,
		})
		expect(post).toMatchObject({
			'@type': 'BlogPosting',
			headline: 'Things I use',
			description: 'My setup.',
			datePublished: '2020-01-12T00:00:00.000Z',
			url: 'https://www.prvnbist.com/blog/uses',
			mainEntityOfPage: 'https://www.prvnbist.com/blog/uses',
			image: 'https://www.prvnbist.com/images/thumbs/home.jpg',
			keywords: 'tech, setup',
			author: { '@type': 'Person', name: 'Praveen Bisht' },
		})
	})
})
