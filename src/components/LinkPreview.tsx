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
				className="font-[inherit] text-inherit underline decoration-white/30 decoration-dashed underline-offset-4 hover:decoration-white focus-visible:decoration-white"
			>
				{children}
			</a>
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				tabIndex={-1}
				aria-label="Open website preview"
				className="pointer-events-none invisible absolute bottom-full left-1/2 z-10 block w-64 -translate-x-1/2 translate-y-2 pb-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
			>
				<img
					src={image}
					alt=""
					width={1920}
					height={1080}
					loading="lazy"
					className="block aspect-video w-full rounded-xl border border-white/10 bg-dark-400 object-cover shadow-2xl shadow-black/60"
				/>
			</a>
		</span>
	)
}

export default LinkPreview
