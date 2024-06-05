export type Article = {
	id: string
	title: string
	date: string
	path: string
	tags: string[]
}

export type BlogProps = {
	searchParams: { [key: string]: string }
}
