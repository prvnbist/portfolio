import type { BlogSearch } from './articles.types'

/** A non-blank string, or undefined for anything else (numbers, arrays, objects, blanks). */
export const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v : undefined)

/** Blog search params from untrusted input (the URL, or a server function call). */
export const parseBlogSearch = (input: unknown): BlogSearch => {
	const search = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
	return { s: str(search.s), tag: str(search.tag) }
}

/** An article slug from untrusted input; anything that isn't a string matches no article. */
export const parseSlug = (input: unknown) => (typeof input === 'string' ? input : '')
