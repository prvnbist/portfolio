import { describe, expect, it } from 'vitest'

import { blobMotion } from './header'

const blob = { x: [0, 80, -40, 0], y: [0, -50, 40, 0] }

describe('blobMotion', () => {
	it('loops the drift forever while the hero is on screen', () => {
		const m = blobMotion(blob, true)
		expect(m.animate).toEqual({ x: blob.x, y: blob.y })
		expect(m.transition.repeat).toBe(Number.POSITIVE_INFINITY)
	})

	it('settles at rest and stops repeating once the hero is off screen', () => {
		const m = blobMotion(blob, false)
		expect(m.animate).toEqual({ x: 0, y: 0 })
		expect(m.transition.repeat).toBe(0)
	})
})
