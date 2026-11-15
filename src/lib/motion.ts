import { MotionGlobalConfig } from 'framer-motion'

type MediaQuery = {
	matches: boolean
	addEventListener(type: 'change', listener: () => void): void
	removeEventListener(type: 'change', listener: () => void): void
}

/**
 * With reduced motion preferred, make every framer-motion animation jump straight to its final
 * keyframe: reveals show their content at once and looping blobs stay still. (`MotionConfig
 * reducedMotion="user"` alone only disables transforms; opacity and blur would still animate.)
 */
export const syncReducedMotion = (mq: MediaQuery) => {
	const apply = () => {
		MotionGlobalConfig.skipAnimations = mq.matches
	}
	apply()
	mq.addEventListener('change', apply)
	return () => mq.removeEventListener('change', apply)
}

/** Call once in the browser, before hydration, so first-paint animations are skipped too. */
export const initReducedMotion = () => {
	if (typeof window === 'undefined' || !window.matchMedia) return
	syncReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)'))
}
