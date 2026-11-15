import { describe, expect, it } from 'vitest'

import { pillClass } from './Pill'

describe('pillClass', () => {
	it('defaults to the outlined style', () => {
		expect(pillClass()).toContain('border-white/10')
		expect(pillClass()).toContain('uppercase')
	})

	it('uses the accent gradient for the accent variant', () => {
		const cls = pillClass({ variant: 'accent' })
		expect(cls).toContain('from-accent-from')
		expect(cls).not.toContain('border-white/10')
	})

	it('adds hover and focus styles only when interactive', () => {
		expect(pillClass()).not.toContain('focus-visible:')
		expect(pillClass({ interactive: true })).toContain('focus-visible:outline-accent-to')
	})

	it('uses text of at least 12px', () => {
		expect(pillClass()).toContain('text-xs')
		expect(pillClass()).not.toMatch(/text-\[(?:[0-9]|1[01])px\]/)
	})
})
