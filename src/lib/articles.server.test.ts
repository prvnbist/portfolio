import { describe, expect, it } from 'vitest'

import {
	fetchArticlePage,
	fetchBlogIndex,
	filterArticles,
	listSlugs,
	toMeta,
} from './articles.server'
import type { ArticleMeta } from './articles.types'
import { checkFrontmatter } from './frontmatter'

const article = (slug: string, title: string, tags: string[]): ArticleMeta => ({
	slug,
	title,
	date: '2020-01-01T00:00:00.000Z',
	tags,
	description: null,
	ogImage: null,
})

const list = [
	article('react-tags', 'Create a Tags Input in React', ['react', 'component']),
	article('css-grid', 'CSS Grid Cards Layout', ['css', 'layout']),
	article('react-firebase', 'Setting up Firebase', ['react', 'firebase']),
]

const slugs = (items: ArticleMeta[]) => items.map(a => a.slug)

describe('filterArticles', () => {
	it('returns everything when no filters are set', () => {
		expect(slugs(filterArticles(list, {}))).toEqual(['react-tags', 'css-grid', 'react-firebase'])
	})

	it('matches keyword as a case-insensitive, trimmed title substring', () => {
		expect(slugs(filterArticles(list, { s: '  GRID ' }))).toEqual(['css-grid'])
		expect(slugs(filterArticles(list, { s: 'firebase' }))).toEqual(['react-firebase'])
	})

	it('ignores a blank keyword', () => {
		expect(filterArticles(list, { s: '   ' })).toHaveLength(3)
	})

	it('filters by exact tag', () => {
		expect(slugs(filterArticles(list, { tag: 'react' }))).toEqual([
			'react-tags',
			'react-firebase',
		])
		expect(filterArticles(list, { tag: 'reac' })).toEqual([])
	})

	it('combines keyword and tag with AND', () => {
		expect(slugs(filterArticles(list, { s: 'tags', tag: 'react' }))).toEqual(['react-tags'])
		expect(filterArticles(list, { s: 'grid', tag: 'react' })).toEqual([])
	})
})

describe('toMeta', () => {
	it('fills defaults for missing frontmatter', () => {
		expect(toMeta('some-slug', {})).toEqual({
			slug: 'some-slug',
			title: 'some-slug',
			date: null,
			tags: [],
			description: null,
			ogImage: null,
		})
	})

	it('normalises date to ISO and ignores non-array tags', () => {
		const meta = toMeta('x', { title: 'X', date: new Date('2024-04-01'), tags: 'react' })
		expect(meta.date).toBe('2024-04-01T00:00:00.000Z')
		expect(meta.tags).toEqual([])
	})
})

describe('content from src/articles (via import.meta.glob)', () => {
	const all = fetchBlogIndex({}).articles

	it('loads every article, sorted newest first', () => {
		expect(all.length).toBeGreaterThan(0)
		expect(listSlugs()).toEqual(slugs(all))
		const times = all.map(a => new Date(a.date ?? 0).getTime())
		expect(times).toEqual([...times].sort((a, b) => b - a))
	})

	it('builds a sorted, de-duplicated tag list', () => {
		const { tags } = fetchBlogIndex({})
		expect(tags).toEqual([...new Set(tags)].sort())
	})

	it('has no previous for the newest and no next for the oldest', () => {
		const first = fetchArticlePage(all[0].slug)
		expect(first?.previous).toBeNull()
		expect(first?.next?.slug).toBe(all[1].slug)

		const last = fetchArticlePage(all[all.length - 1].slug)
		expect(last?.next).toBeNull()
		expect(last?.previous?.slug).toBe(all[all.length - 2].slug)
	})

	it('links neighbours for a middle article', () => {
		const page = fetchArticlePage(all[1].slug)
		expect(page?.meta.slug).toBe(all[1].slug)
		expect(page?.previous?.slug).toBe(all[0].slug)
		expect(page?.next?.slug).toBe(all[2].slug)
	})

	it('returns null for an unknown slug', () => {
		expect(fetchArticlePage('does-not-exist')).toBeNull()
	})
})

describe('checkFrontmatter', () => {
	const valid = { title: 'T', date: new Date('2024-01-01'), description: 'D' }

	it('accepts complete frontmatter', () => {
		expect(() => checkFrontmatter('ok', valid)).not.toThrow()
	})

	it.each(['title', 'date', 'description'])('names the slug and field when %s is missing', key => {
		const data: Record<string, unknown> = { ...valid, [key]: undefined }
		expect(() => checkFrontmatter('my-post', data)).toThrow(/my-post.*\b/)
		expect(() => checkFrontmatter('my-post', data)).toThrow(new RegExp(key))
	})

	it('rejects blank values and descriptions over 160 characters', () => {
		expect(() => checkFrontmatter('p', { ...valid, title: '  ' })).toThrow(/title/)
		expect(() => checkFrontmatter('p', { ...valid, description: 'x'.repeat(161) })).toThrow(/160/)
	})

	it('passes for every article in src/articles', () => {
		expect(fetchBlogIndex({}).articles.every(a => a.description)).toBe(true)
	})
})
