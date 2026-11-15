// Imported by vite.config.ts (Nitro routeRules), so no path aliases here.

/** The full policy, sent report-only first: violations show up in the console, nothing breaks. */
const REPORT_ONLY_CSP = {
	'default-src': ["'self'"],
	// 'unsafe-inline': TanStack Start's hydration scripts and the inline gtag bootstrap.
	'script-src': [
		"'self'",
		"'unsafe-inline'",
		'https://www.googletagmanager.com',
		'https://cpwebassets.codepen.io',
	],
	'style-src': ["'self'", "'unsafe-inline'"],
	'img-src': [
		"'self'",
		'data:',
		'https://res.cloudinary.com',
		'https://www.googletagmanager.com',
		'https://*.google-analytics.com',
	],
	'font-src': ["'self'"],
	'connect-src': [
		"'self'",
		'https://analytics.prvnbist.com',
		'https://*.google-analytics.com',
		'https://*.analytics.google.com',
		'https://www.googletagmanager.com',
	],
	'frame-src': ['https://codepen.io'],
	'object-src': ["'none'"],
	'base-uri': ["'self'"],
	'form-action': ["'self'"],
} as const

const serialize = (policy: Record<string, readonly string[]>) =>
	Object.entries(policy)
		.map(([directive, values]) => `${directive} ${values.join(' ')}`)
		.join('; ')

/** Response headers for every route (vite.config.ts → nitro routeRules). */
export const SECURITY_HEADERS: Record<string, string> = {
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
	'X-Frame-Options': 'DENY',
	// frame-ancestors is ignored in a report-only policy, so it is enforced on its own.
	'Content-Security-Policy': "frame-ancestors 'none'",
	'Content-Security-Policy-Report-Only': serialize(REPORT_ONLY_CSP),
}
