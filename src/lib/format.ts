const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
}

/**
 * Formats an ISO date (e.g. frontmatter `2024-04-01`) in UTC, so it shows the same calendar date
 * on the server and in every visitor's timezone, with no hydration mismatch.
 */
export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS) =>
	new Intl.DateTimeFormat('en-US', { ...opts, timeZone: 'UTC' }).format(new Date(iso))
