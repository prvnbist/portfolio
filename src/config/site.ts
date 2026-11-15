/** Single source of truth for who the site is about and how it's navigated. */

export const SITE_URL = 'https://www.prvnbist.com'

export const NAME = 'Praveen Bisht'

export const ROLE = 'AI Engineer'

export const BIO = `Hey👋🏽, I’m an ${ROLE} specializing in front-end, building all things SMS at JustCall.`

export const TWITTER = '@prvnbist'

/** Fallback share image, relative to the site root. */
export const DEFAULT_OG = '/images/thumbs/home.jpg'

export const NAV = [
	{ title: 'code.', url: '/code' },
	{ title: 'articles.', url: '/blog' },
] as const

/** Document title: "Code | Praveen Bisht | AI Engineer", or "Praveen Bisht | AI Engineer". */
export const pageTitle = (page?: string) => [page, NAME, ROLE].filter(Boolean).join(' | ')
