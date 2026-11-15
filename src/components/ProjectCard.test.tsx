import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import ProjectCard from './ProjectCard'

const base = {
	title: 'JSONVi',
	description: 'A JSON viewer.',
	image: '/images/code/jsonvi_1.png',
}

describe('ProjectCard', () => {
	it('renders title, description and image', () => {
		const html = renderToStaticMarkup(<ProjectCard {...base} />)
		expect(html).toMatch(/^<li/)
		expect(html).toContain('<h2')
		expect(html).toContain('JSONVi')
		expect(html).toContain('A JSON viewer.')
		expect(html).toContain('src="/images/code/jsonvi_1.png"')
	})

	it('renders actions as external links, never a button inside a link', () => {
		const html = renderToStaticMarkup(
			<ProjectCard
				{...base}
				actions={[
					{ label: 'Demo', href: 'https://a.example' },
					{ label: 'Code', href: 'https://b.example' },
				]}
			/>
		)
		expect(html.match(/<a /g)).toHaveLength(2)
		expect(html).toContain('target="_blank"')
		expect(html).not.toContain('<button')
	})

	it('makes every action after the first secondary', () => {
		const html = renderToStaticMarkup(
			<ProjectCard
				{...base}
				actions={[
					{ label: 'Demo', href: 'https://a.example' },
					{ label: 'Code', href: 'https://b.example' },
				]}
			/>
		)
		const [first, second] = html.split('<a ').slice(1)
		expect(first).toContain('from-accent-from')
		expect(second).toContain('border-accent-to/40')
	})

	it('shows tags and a Featured pill when asked', () => {
		const html = renderToStaticMarkup(<ProjectCard {...base} tags={['React']} featured />)
		expect(html).toContain('React')
		expect(html).toContain('Featured')
	})
})
