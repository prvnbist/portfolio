import './globals.css'
import Link from 'next/link'
export { metadata } from '@/seo'
import Logo from '@/assets/logos/Logo'
import { cn } from '@/utils/cn'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					'relative h-screen bg-zinc-800 px-4 pb-4 pt-2 font-sans antialiased',
					geistSans.variable,
					geistMono.variable
				)}
			>
				<div
					className="fixed left-0 top-0 w-full h-2 bg-[repeating-linear-gradient(45deg,_#facc15_0_10px,_#000_10px_20px)]"
					title="Work In Progress"
				/>
				<header className="h-16 flex items-center justify-center">
					<Link href="/" className="font-semibold text-2xl">
						<span className="size-16 grid place-content-center">
							<Logo size={36} />
						</span>
					</Link>
				</header>
				<div className="h-[calc(100vh_-_88px)] overflow-auto bg-zinc-900 rounded-2xl">
					<div className="px-4 h-full mx-auto w-full max-w-4xl">{children}</div>
				</div>
			</body>
		</html>
	)
}
