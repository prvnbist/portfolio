// No imports: vite.config.ts loads this before any aliases or plugins exist.

const isBlank = (v: unknown) =>
	v === undefined || v === null || (typeof v === 'string' && !v.trim())

/**
 * Throws, naming the article, if its frontmatter lacks what its listing, page and SEO tags need.
 * Runs at build time (a Vite plugin in vite.config.ts) and when the content layer loads.
 */
export const checkFrontmatter = (slug: string, data: Record<string, unknown>) => {
	const missing = ['title', 'date', 'description'].filter(key => isBlank(data[key]))
	if (missing.length)
		throw new Error(`Article "${slug}" is missing frontmatter: ${missing.join(', ')}`)
	if (String(data.description).length > 160)
		throw new Error(`Article "${slug}" has a description over 160 characters`)
}
