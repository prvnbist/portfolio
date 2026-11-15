import { describe, expect, it } from 'vitest'

import { SECURITY_HEADERS } from './security-headers'

const policy = (header: string) =>
	Object.fromEntries(
		SECURITY_HEADERS[header]
			.split(';')
			.map(d => d.trim().split(/\s+/))
			.filter(([name]) => name)
			.map(([name, ...values]) => [name, values])
	)

describe('SECURITY_HEADERS', () => {
	it('sets the basic hardening headers', () => {
		expect(SECURITY_HEADERS['X-Content-Type-Options']).toBe('nosniff')
		expect(SECURITY_HEADERS['Referrer-Policy']).toBe('strict-origin-when-cross-origin')
		expect(SECURITY_HEADERS['Permissions-Policy']).toContain('camera=()')
		expect(SECURITY_HEADERS['X-Frame-Options']).toBe('DENY')
	})

	it('enforces frame-ancestors (ignored in report-only) and nothing else yet', () => {
		expect(SECURITY_HEADERS['Content-Security-Policy']).toBe("frame-ancestors 'none'")
	})

	it('reports, without enforcing, a policy that allows only the analytics and embed origins', () => {
		const csp = policy('Content-Security-Policy-Report-Only')
		expect(csp['default-src']).toEqual(["'self'"])
		expect(csp['script-src']).toContain('https://www.googletagmanager.com')
		expect(csp['connect-src']).toEqual(
			expect.arrayContaining([
				'https://analytics.prvnbist.com',
				'https://*.google-analytics.com',
			])
		)
		expect(csp['img-src']).toContain('https://res.cloudinary.com')
		expect(csp['frame-src']).toContain('https://codepen.io')
		expect(csp['object-src']).toEqual(["'none'"])
	})
})
