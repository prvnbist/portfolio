import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import Button, { buttonClass } from './Button'

describe('Button', () => {
	it('renders a link when given href', () => {
		const html = renderToStaticMarkup(<Button href="mailto:hi@example.com">Get in touch</Button>)
		expect(html).toMatch(/^<a [^>]*href="mailto:hi@example.com"/)
		expect(html).not.toContain('target=')
		expect(html).toContain('Get in touch')
	})

	it('opens external links in a new tab safely', () => {
		const html = renderToStaticMarkup(
			<Button href="https://example.com" external>
				Demo
			</Button>
		)
		expect(html).toContain('target="_blank"')
		expect(html).toContain('rel="noopener noreferrer"')
	})

	it('renders a <button type="button"> when given onClick', () => {
		const html = renderToStaticMarkup(<Button onClick={() => {}}>Retry</Button>)
		expect(html).toMatch(/^<button type="button"/)
	})
})

describe('buttonClass', () => {
	it('applies variant and size', () => {
		expect(buttonClass()).toContain('from-accent-from')
		expect(buttonClass()).toContain('h-12')
		const secondary = buttonClass({ variant: 'secondary', size: 'sm' })
		expect(secondary).toContain('border-accent-to/40')
		expect(secondary).toContain('h-9')
		expect(secondary).not.toContain('from-accent-from')
	})
})
