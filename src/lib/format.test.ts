import { describe, expect, it } from 'vitest'

import { formatDate } from './format'

// Frontmatter dates are calendar dates parsed as UTC midnight. West of UTC, the local-time
// rendering lands on the previous day (and month/year at boundaries), and the server (UTC)
// and browser disagree, which is a hydration mismatch.
process.env.TZ = 'America/Los_Angeles'

describe('formatDate', () => {
	it('runs in a timezone west of UTC (sanity check for the tests below)', () => {
		const local = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' })
		expect(local.format(new Date('2024-04-01'))).toBe('Mar 2024')
	})

	it('formats month and year in UTC', () => {
		expect(formatDate('2024-04-01', { year: 'numeric', month: 'short' })).toBe('Apr 2024')
	})

	it('defaults to a short day, month and year in UTC', () => {
		expect(formatDate('2024-07-22T00:00:00.000Z')).toBe('Jul 22, 2024')
	})

	it('keeps the year at a year boundary', () => {
		expect(formatDate('2024-01-01', { year: 'numeric' })).toBe('2024')
	})

	it('ignores a timeZone passed in options', () => {
		expect(formatDate('2024-04-01', { month: 'short', timeZone: 'America/Los_Angeles' })).toBe(
			'Apr'
		)
	})
})
