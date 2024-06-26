import Script from 'next/script'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google'

import './globals.css'
import { cn } from '@/utils'
import { Navbar } from '@/sections'

export const metadata: Metadata = {
	title: 'Praveen Bisht',
	description:
		'Hey👋🏼, I’m a front end engineer with the background in full stack based in New Delhi, India who enjoys building products from idea to implementation.',
}

const ibm_plex_mono = IBM_Plex_Mono({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-code',
})

const bricolage_grotesque = Bricolage_Grotesque({
	subsets: ['latin'],
	variable: '--font-heading',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={cn(ibm_plex_mono.variable, bricolage_grotesque.variable)}>
			<head>
				<Script
					src="/script"
					data-host-url="https://analytics.prvnbist.com"
					data-website-id="9ba1c9a6-566a-46bf-8843-1b178b2ba099"
				/>
				{process.env.NODE_ENV === 'production' && (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
				)}
			</head>
			<body>
				<Navbar />
				{children}
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
						©{new Date().getFullYear()} Made with 💖 using 👩🏽‍💻NextJs, 💾Github & 🌍Vercel.
					</p>
				</footer>
			</body>
		</html>
	)
}
