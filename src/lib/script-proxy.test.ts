import { describe, expect, it } from 'vitest'

import { proxyAnalyticsScript } from './script-proxy'

const hang: typeof fetch = (_url, init) =>
	new Promise((_, reject) => {
		init?.signal?.addEventListener('abort', () => reject(init.signal?.reason))
	})

describe('proxyAnalyticsScript', () => {
	it('returns the upstream script with caching headers', async () => {
		const res = await proxyAnalyticsScript(async () => new Response('console.log(1)'), 3000)
		expect(res.status).toBe(200)
		expect(res.headers.get('content-type')).toContain('javascript')
		expect(res.headers.get('cache-control')).toContain('max-age=3600')
		expect(await res.text()).toBe('console.log(1)')
	})

	it('answers 504 when the upstream does not respond in time', async () => {
		const started = Date.now()
		const res = await proxyAnalyticsScript(hang, 50)
		expect(res.status).toBe(504)
		expect(Date.now() - started).toBeLessThan(1000)
	})

	it('answers 502 when the upstream fails or errors', async () => {
		expect(
			(await proxyAnalyticsScript(async () => new Response('', { status: 500 }), 3000)).status
		).toBe(502)
		const offline: typeof fetch = async () => {
			throw new TypeError('fetch failed')
		}
		expect((await proxyAnalyticsScript(offline, 3000)).status).toBe(502)
	})
})
