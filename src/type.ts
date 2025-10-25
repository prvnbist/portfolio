export type Timeline = {
	id: string
	url: string | null
	institution: string
	duration: Array<{ from: string; to: string | null; title: string }>
	location: string
	description: Array<string>
}
