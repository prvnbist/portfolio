import { createRouter } from '@tanstack/react-router'

import { ErrorPage, NotFound } from './components'
import { routeTree } from './routeTree.gen'

export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: 'intent',
		// Page-level errors and 404s render inside the root layout (navbar + <main>).
		defaultErrorComponent: ErrorPage,
		defaultNotFoundComponent: () => <NotFound />,
	})
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof getRouter>
	}
}
