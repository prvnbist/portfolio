import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

import headingFont from '@fontsource-variable/stack-sans-notch/files/stack-sans-notch-latin-wght-normal.woff2?url'

import appCss from '@/app/globals.css?url'
import { ErrorPage, NotFound } from '@/components'
import { BIO, pageTitle } from '@/config/site'
import { initReducedMotion } from '@/lib/motion'
import { Navbar } from '@/sections'

initReducedMotion()

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: pageTitle() },
			{ name: 'description', content: BIO },
		],
		links: [
			// The heading font is needed for the first paint of every page; fetch it with the CSS.
			{
				rel: 'preload',
				href: headingFont,
				as: 'font',
				type: 'font/woff2',
				crossOrigin: 'anonymous',
			},
			{ rel: 'stylesheet', href: appCss },
		],
		scripts: [
			...(import.meta.env.PROD && import.meta.env.VITE_GOOGLE_ANALYTICS
				? [
						{
							src: `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS}`,
							async: true,
						},
						{
							children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${import.meta.env.VITE_GOOGLE_ANALYTICS}');`,
						},
					]
				: []),
			{
				src: '/script',
				defer: true,
				'data-host-url': 'https://analytics.prvnbist.com',
				'data-website-id': '9ba1c9a6-566a-46bf-8843-1b178b2ba099',
			},
		],
	}),
	// The document lives in the shell so a root-level error still gets <head> and styles.
	shellComponent: RootDocument,
	component: RootComponent,
	notFoundComponent: () => <NotFound />,
	errorComponent: ErrorPage,
})

function RootComponent() {
	return (
		<MotionConfig reducedMotion="user">
			<a
				href="#content"
				className="sr-only rounded-full bg-bg px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-1001 focus:outline-2 focus:outline-accent-to"
			>
				Skip to content
			</a>
			<Navbar />
			<main id="content" tabIndex={-1} className="outline-hidden">
				<Outlet />
			</main>
		</MotionConfig>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="relative min-h-screen lg:before:pointer-events-none lg:before:absolute lg:before:inset-y-0 lg:before:left-1/2 lg:before:w-[920px] lg:before:-translate-x-1/2 lg:before:border-x lg:before:border-line lg:before:content-['']">
				{children}
				<Scripts />
			</body>
		</html>
	)
}
