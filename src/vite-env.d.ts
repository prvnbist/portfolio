/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** Public (browser-exposed) Google Analytics measurement ID. */
	readonly VITE_GOOGLE_ANALYTICS?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module '*.mdx' {
	import type { ComponentType } from 'react'
	const Component: ComponentType<{ components?: Record<string, any> }>
	export default Component
}
