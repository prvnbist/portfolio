import { describe, expect, it } from 'vitest'

import { BIO, pageTitle, ROLE } from './site'

describe('site config', () => {
	it('builds page titles with the role', () => {
		expect(pageTitle('Code')).toBe('Code | Praveen Bisht | AI Engineer')
		expect(pageTitle()).toBe('Praveen Bisht | AI Engineer')
	})

	it('uses the same role in the bio', () => {
		expect(BIO).toContain(ROLE)
		expect(BIO.length).toBeLessThanOrEqual(160)
	})
})
