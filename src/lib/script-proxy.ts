export const ANALYTICS_SCRIPT_URL = 'https://analytics.prvnbist.com/script.js'

/**
 * Fetches the self-hosted analytics script for the /script route. A slow upstream must not hold
 * the request open: after `timeoutMs` it answers 504. Other failures answer 502.
 */
export const proxyAnalyticsScript = async (fetchImpl: typeof fetch, timeoutMs = 3000) => {
	try {
		const upstream = await fetchImpl(ANALYTICS_SCRIPT_URL, {
			signal: AbortSignal.timeout(timeoutMs),
		})
		if (!upstream.ok) return new Response('Bad gateway', { status: 502 })
		return new Response(upstream.body, {
			status: 200,
			headers: {
				'content-type': 'application/javascript; charset=utf-8',
				'cache-control': 'public, max-age=3600, s-maxage=3600',
			},
		})
	} catch (error) {
		const timedOut = error instanceof DOMException && error.name === 'TimeoutError'
		return timedOut
			? new Response('Gateway timeout', { status: 504 })
			: new Response('Bad gateway', { status: 502 })
	}
}
