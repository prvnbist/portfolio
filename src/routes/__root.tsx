import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

import appCss from '@/app/globals.css?url'
import { initReducedMotion } from '@/lib/motion'
import { Navbar } from '@/sections'

initReducedMotion()

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'Praveen Bisht' },
			{
				name: 'description',
				content:
					'Hey👋🏼, I’m a front end engineer with the background in full stack based in New Delhi, India who enjoys building products from idea to implementation.',
			},
		],
		links: [{ rel: 'stylesheet', href: appCss }],
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
	component: RootComponent,
})

function RootComponent() {
	return (
		<RootDocument>
			<MotionConfig reducedMotion="user">
				<Navbar />
				<Outlet />
			</MotionConfig>
		</RootDocument>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="relative min-h-screen bg-zinc-950 lg:before:pointer-events-none lg:before:absolute lg:before:inset-y-0 lg:before:left-1/2 lg:before:w-[920px] lg:before:-translate-x-1/2 lg:before:border-x lg:before:border-line lg:before:content-['']">
				{children}
				<Scripts />
			</body>
		</html>
	)
}
