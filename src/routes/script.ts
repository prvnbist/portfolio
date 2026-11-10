import { createFileRoute } from '@tanstack/react-router'

// Server-side proxy: /script -> self-hosted analytics script (replaces the Next.js rewrite).
export const Route = createFileRoute('/script')({
	server: {
		handlers: {
			GET: async () => {
				const upstream = await fetch('https://analytics.prvnbist.com/script.js')
				if (!upstream.ok) return new Response('Not found', { status: 502 })
				return new Response(upstream.body, {
					status: 200,
					headers: {
						'content-type': 'application/javascript; charset=utf-8',
						'cache-control': 'public, max-age=3600, s-maxage=3600',
					},
				})
			},
		},
	},
})
