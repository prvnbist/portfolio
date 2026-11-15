import type { ReactNode } from 'react'

type LinkPreviewProps = {
	href: string
	image: string
	children: ReactNode
}

const LinkPreview = ({ href, image, children }: LinkPreviewProps) => {
	return (
		<span className="group relative inline-block font-[inherit]">
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="font-[inherit] inline-block border-b border-white/30 text-white"
			>
				{children}
			</a>
			{/* Decorative preview: not a second link, and hidden from assistive tech. */}
			<span
				aria-hidden="true"
				className="pointer-events-none invisible absolute bottom-full left-1/2 z-10 block w-64 -translate-x-1/2 translate-y-2 pb-3 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
			>
				<img
					src={image}
					alt=""
					width={1920}
					height={1080}
					loading="lazy"
					className="block aspect-video w-full rounded-xl border border-white/10 bg-dark-400 object-cover shadow-2xl shadow-black/60"
				/>
			</span>
		</span>
	)
}

export default LinkPreview
