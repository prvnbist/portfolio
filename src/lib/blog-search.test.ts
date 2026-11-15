import { describe, expect, it } from 'vitest'

import { parseBlogSearch, parseSlug, str } from './blog-search'

describe('str', () => {
	it('keeps non-blank strings and drops everything else', () => {
		expect(str('react')).toBe('react')
		expect(str('  ')).toBeUndefined()
		expect(str(123)).toBeUndefined()
		expect(str(['a'])).toBeUndefined()
		expect(str(null)).toBeUndefined()
	})
})

describe('parseBlogSearch', () => {
	it('passes valid params through', () => {
		expect(parseBlogSearch({ s: 'hooks', tag: 'react' })).toEqual({ s: 'hooks', tag: 'react' })
	})

	it('turns non-string values into undefined', () => {
		expect(parseBlogSearch({ s: 123, tag: { x: 1 } })).toEqual({ s: undefined, tag: undefined })
	})

	it('accepts input that is not an object', () => {
		expect(parseBlogSearch(undefined)).toEqual({ s: undefined, tag: undefined })
		expect(parseBlogSearch('s=react')).toEqual({ s: undefined, tag: undefined })
	})
})

describe('parseSlug', () => {
	it('keeps a string slug and turns anything else into an empty string', () => {
		expect(parseSlug('uses')).toBe('uses')
		expect(parseSlug(42)).toBe('')
		expect(parseSlug({ slug: 'uses' })).toBe('')
	})
})
