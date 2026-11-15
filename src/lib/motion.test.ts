import { MotionGlobalConfig } from 'framer-motion'
import { afterEach, describe, expect, it } from 'vitest'

import { syncReducedMotion } from './motion'

const fakeMedia = (matches: boolean) => {
	const listeners = new Set<() => void>()
	const mq = {
		matches,
		addEventListener: (_: 'change', fn: () => void) => listeners.add(fn),
		removeEventListener: (_: 'change', fn: () => void) => listeners.delete(fn),
	}
	return {
		mq,
		listeners,
		set(value: boolean) {
			mq.matches = value
			for (const fn of listeners) fn()
		},
	}
}

afterEach(() => {
	MotionGlobalConfig.skipAnimations = false
})

describe('syncReducedMotion', () => {
	it('skips animations when reduced motion is preferred', () => {
		syncReducedMotion(fakeMedia(true).mq)
		expect(MotionGlobalConfig.skipAnimations).toBe(true)
	})

	it('leaves animations on otherwise', () => {
		syncReducedMotion(fakeMedia(false).mq)
		expect(MotionGlobalConfig.skipAnimations).toBe(false)
	})

	it('follows changes to the setting and stops after cleanup', () => {
		const media = fakeMedia(false)
		const stop = syncReducedMotion(media.mq)
		media.set(true)
		expect(MotionGlobalConfig.skipAnimations).toBe(true)
		stop()
		expect(media.listeners.size).toBe(0)
	})
})
