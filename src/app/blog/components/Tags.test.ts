import { describe, expect, it } from 'vitest'

import { toggleTag } from './Tags'

describe('toggleTag', () => {
	it('sets the tag when none is active', () => {
		expect(toggleTag({}, 'react')).toEqual({ tag: 'react' })
	})

	it('switches to a different tag', () => {
		expect(toggleTag({ tag: 'css' }, 'react')).toEqual({ tag: 'react' })
	})

	it('clears the tag when the active one is chosen again', () => {
		expect(toggleTag({ tag: 'react' }, 'react')).toEqual({ tag: undefined })
	})

	it('keeps the search keyword', () => {
		expect(toggleTag({ s: 'hooks' }, 'react')).toEqual({ s: 'hooks', tag: 'react' })
		expect(toggleTag({ s: 'hooks', tag: 'react' }, 'react')).toEqual({
			s: 'hooks',
			tag: undefined,
		})
	})
})
