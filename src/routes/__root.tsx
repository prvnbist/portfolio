import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import appCss from '@/app/globals.css?url'
import { Navbar } from '@/sections'

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
			<Navbar />
			<Outlet />
			<Footer />
		</RootDocument>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<svg
					width="100%"
					height="100%"
					className="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light"
				>
					<title>noise</title>
					<filter id="noise">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.80"
							numOctaves="4"
							stitchTiles="stitch"
						/>
					</filter>
					<rect width="100%" height="100%" filter="url(#noise)" />
				</svg>
				{children}
				<Scripts />
			</body>
		</html>
	)
}

function Footer() {
	return (
		<>
			<section className="px-4 lg:w-[980px] bg-[#202024] rounded-lg mx-4 lg:mx-auto py-16 text-center mt-8 mb-16">
				<h2 className="text-3xl mb-4">Get in touch</h2>
				<p className="text-xl font-thin mx-auto md:w-7/12">
					Have a project for me, or just want to say Hi🙋🏽‍♂️? Feel free to email me at{' '}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="mailto:prvnbist@gmail.com"
						className="text-yellow-300 underline"
					>
						prvnbist@gmail.com
					</a>
					.
				</p>
			</section>
			<footer className="border-t border-gray-800 py-5">
				<p className="text-center">
					©{new Date().getFullYear()} Made with 💖 using 👩🏽‍💻TanStack Start, 💾Github &
					🌍Vercel.
				</p>
			</footer>
		</>
	)
}
