export type ArticleMeta = {
	slug: string
	title: string
	date: string | null
	tags: string[]
	description: string | null
	ogImage: string | null
}

export type ArticlePage = {
	meta: ArticleMeta
	previous: ArticleMeta | null
	next: ArticleMeta | null
}
