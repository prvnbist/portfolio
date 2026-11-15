import { describe, expect, it } from 'vitest'

import { ACCENTS, accentAt } from './accents'

describe('accentAt', () => {
	it('cycles through the accents by index', () => {
		expect(accentAt(0)).toBe(ACCENTS[0])
		expect(accentAt(ACCENTS.length + 1)).toBe(ACCENTS[1])
	})

	it('gives every accent a text, hover, glow and dot class', () => {
		for (const accent of ACCENTS) {
			expect(Object.keys(accent).sort()).toEqual(['dot', 'glow', 'hover', 'text'])
		}
	})
})
