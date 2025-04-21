import './globals.css'
export { metadata } from '@/seo'
import Logo from '@/assets/logos/Logo'
import { cn } from '@/utils/cn'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Geist, Geist_Mono, Unbounded } from 'next/font/google'
import Link from 'next/link'
import Script from 'next/script'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const unbounded = Unbounded({
	variable: '--font-serif',
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
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
			<body
				className={cn(
					'relative h-dvh bg-zinc-800 px-4 pb-4 pt-2 font-sans antialiased',
					geistSans.variable,
					geistMono.variable,
					unbounded.variable
				)}
			>
				<div
					className="fixed left-0 top-0 w-full h-2 bg-[repeating-linear-gradient(45deg,_#facc15_0_10px,_#000_10px_20px)]"
					title="Work In Progress"
				/>
				<nav className="h-16 flex items-center justify-center">
					<Link href="/" className="font-semibold text-2xl">
						<span className="size-16 grid place-content-center">
							<Logo size={36} />
						</span>
					</Link>
				</nav>
				<div className="h-[calc(100dvh_-_88px)] overflow-auto bg-zinc-900 rounded-2xl">
					<div className="px-4 h-full mx-auto w-full max-w-5xl">{children}</div>
				</div>
			</body>
		</html>
	)
}
