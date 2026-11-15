import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { components } from './Content'

const render = (name: string, props: Record<string, unknown>) => {
	const Component = components[name as keyof typeof components] as (p: object) => JSX.Element
	return renderToStaticMarkup(<Component {...props} />)
}

describe('MDX components', () => {
	it('renders images lazily with async decoding and keeps alt text', () => {
		const html = render('img', { src: '/a.png', alt: 'Diagram' })
		expect(html).toContain('loading="lazy"')
		expect(html).toContain('decoding="async"')
		expect(html).toContain('alt="Diagram"')
	})

	it('keeps an image title as a tooltip and adds no wrapper (images sit inside <p>)', () => {
		const html = render('img', { src: '/a.png', alt: '', title: 'Figure 1' })
		expect(html).toMatch(/^<img [^>]*title="Figure 1"/)
	})

	it('wraps tables in a horizontally scrollable, focusable region', () => {
		const html = render('table', { children: null })
		expect(html).toMatch(/^<section[^>]*overflow-x-auto/)
		expect(html).toContain('tabindex="0"')
		expect(html).toContain('<table')
	})

	it('no longer provides the unused Video component', () => {
		expect('Video' in components).toBe(false)
	})
})
