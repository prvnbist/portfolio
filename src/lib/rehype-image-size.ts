// Loaded by vite.config.ts at build time, so it uses only relative/node imports (no aliases).
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { imageSize } from 'image-size'

type Node = {
	type: string
	tagName?: string
	properties?: Record<string, unknown>
	children?: Node[]
}

/**
 * Rehype plugin: gives markdown images that live in /public their intrinsic width and height, so
 * the browser reserves space before they load (no layout shift). Remote images are left as they
 * are, since the build must not need the network. A missing local file fails the build.
 */
export const rehypeImageSize =
	({ publicDir }: { publicDir: string }) =>
	(tree: Node) => {
		const walk = (node: Node) => {
			const src = node.properties?.src
			if (
				node.type === 'element' &&
				node.tagName === 'img' &&
				typeof src === 'string' &&
				src.startsWith('/')
			) {
				let buffer: Buffer
				try {
					buffer = readFileSync(join(publicDir, src))
				} catch {
					throw new Error(`Article image not found in public/: ${src}`)
				}
				const { width, height } = imageSize(buffer)
				node.properties = { ...node.properties, width, height }
			}
			node.children?.forEach(walk)
		}
		walk(tree)
	}
