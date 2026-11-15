import { readdirSync } from 'node:fs'

import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { NAV, SITE_URL } from '../src/config/site'

const ARTICLES = readdirSync(new URL('../src/articles/', import.meta.url))
	.filter(file => file.endsWith('.mdx'))
	.map(file => `/blog/${file.replace(/\.mdx$/, '')}`)

/** Every page the sitemap should list: home, the nav pages and every article. */
const PAGES = ['/', ...NAV.map(link => link.url), ...ARTICLES]

/**
 * Keep the run hermetic: stub the analytics proxy and answer every third-party request locally,
 * so a slow or unreachable outside host can't fail the suite.
 */
const isolate = async (page: Page, baseURL: string) => {
	await page.route('**/script', route =>
		route.fulfill({ contentType: 'application/javascript', body: '' })
	)
	await page.route(
		url => !url.href.startsWith(baseURL),
		route => route.fulfill({ status: 204, body: '' })
	)
}

/** Console errors raised by the site itself, plus any React hydration error or warning. */
const collectErrors = (page: Page, baseURL: string) => {
	const errors: string[] = []
	page.on('pageerror', error => errors.push(`pageerror: ${error.message}`))
	page.on('console', message => {
		const text = message.text()
		const ownCode = message.location().url.startsWith(baseURL)
		const react = /hydrat|Minified React error|did not match/i.test(text)
		if ((message.type() === 'error' && ownCode) || react)
			errors.push(`${message.type()}: ${text}`)
	})
	return errors
}

test('the sitemap lists exactly the expected pages', async ({ request }) => {
	const xml = await (await request.get('/sitemap.xml')).text()
	const listed = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)
	expect(listed.sort()).toEqual([...PAGES].sort())
})

for (const path of PAGES) {
	test(`smoke ${path}`, async ({ page, baseURL }) => {
		await isolate(page, baseURL!)
		const errors = collectErrors(page, baseURL!)

		const response = await page.goto(path)
		expect(response?.status()).toBe(200)
		await page.waitForLoadState('networkidle')

		await expect(page).toHaveTitle(/\S/)
		const description = await page.locator('meta[name="description"]').getAttribute('content')
		expect(description?.trim(), 'meta description').toBeTruthy()
		const canonical = path === '/' ? SITE_URL : `${SITE_URL}${path}`
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
		await expect(page.locator('main')).toHaveCount(1)

		expect(errors).toEqual([])
	})
}

test.describe('accessibility', () => {
	// Reveal animations start at opacity 0; reduced motion shows everything at once for axe.
	test.use({ reducedMotion: 'reduce' })

	for (const path of [
		'/',
		'/blog',
		'/code',
		'/design',
		'/blog/css-grid-cards-layout-and-aspect-ratio',
	]) {
		test(`axe ${path}`, async ({ page, baseURL }) => {
			await isolate(page, baseURL!)
			await page.goto(path)
			await page.waitForLoadState('networkidle')
			const results = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
				.exclude('iframe')
				.analyze()
			const blocking = results.violations
				.filter(v => v.impact === 'serious' || v.impact === 'critical')
				.map(v => `${v.id} (${v.impact}): ${v.nodes.map(n => n.target.join(' ')).join(', ')}`)
			expect(blocking).toEqual([])
		})
	}
})
