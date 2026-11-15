import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { rehypeImageSize } from './rehype-image-size'

const publicDir = fileURLToPath(new URL('../../public', import.meta.url))

const img = (src: string) => ({
	type: 'element',
	tagName: 'img',
	properties: { src } as Record<string, unknown>,
	children: [],
})

const run = (node: ReturnType<typeof img>) => {
	rehypeImageSize({ publicDir })({
		type: 'root',
		children: [{ type: 'element', tagName: 'p', properties: {}, children: [node] }],
	})
	return node.properties
}

describe('rehypeImageSize', () => {
	it('adds the intrinsic width and height of local images', () => {
		const props = run(
			img('/images/articles/css-grid-cards-layout-and-aspect-ratio/ne3lz2SITdGaBCXKrRoN.webp')
		)
		expect(props).toMatchObject({ width: 800, height: 401 })
	})

	it('leaves remote images alone', () => {
		const props = run(img('https://res.cloudinary.com/x/y.png'))
		expect(props.width).toBeUndefined()
	})

	it('fails loudly, naming the path, when a local image is missing', () => {
		expect(() => run(img('/images/nope.png'))).toThrow(/\/images\/nope\.png/)
	})
})
