import { createFileRoute } from '@tanstack/react-router'

import { proxyAnalyticsScript } from '@/lib/script-proxy'

// Server-side proxy: /script -> self-hosted analytics script (replaces the Next.js rewrite).
export const Route = createFileRoute('/script')({
	server: {
		handlers: {
			GET: () => proxyAnalyticsScript(fetch),
		},
	},
})
