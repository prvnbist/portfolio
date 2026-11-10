export type Design = {
	id: string
	url: string
	title: string
	thumbnail: {
		id: string
		url: string
	}
	description: string
}

export type Article = {
	id: string
	title: string
	date: string
	path: string
	tags: string[]
}

export type BlogSearch = {
	s?: string
	tag?: string
}

export type CmsResult<T> = { data: T; error: false } | { data: null; error: true }
