import { motion } from 'framer-motion'

import { formatDate } from '@/lib/format'
import type { Timeline } from '@/type'

const ANIMATE_PROPS = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
	viewport: { once: true },
}

const ACCENTS = [
	{
		text: 'text-yellow-400',
		hover: 'hover:text-yellow-400',
		glow: 'bg-yellow-400/20',
		dot: 'bg-yellow-400',
	},
	{
		text: 'text-pink-400',
		hover: 'hover:text-pink-400',
		glow: 'bg-pink-400/20',
		dot: 'bg-pink-400',
	},
	{
		text: 'text-sky-400',
		hover: 'hover:text-sky-400',
		glow: 'bg-sky-400/20',
		dot: 'bg-sky-400',
	},
	{
		text: 'text-emerald-400',
		hover: 'hover:text-emerald-400',
		glow: 'bg-emerald-400/20',
		dot: 'bg-emerald-400',
	},
]

const formatMonth = (date: string) => formatDate(date, { year: 'numeric', month: 'short' })

const TimelineItem = ({ timeline, index = 0 }: { timeline: Timeline; index?: number }) => {
	const accent = ACCENTS[index % ACCENTS.length]
	// roles are listed newest first, so reverse for a "career path" reading order
	const roles = [...timeline.duration].reverse()
	const isOngoing = roles.some(role => !role.to)
	const start = roles.reduce((min, role) => (role.from < min ? role.from : min), roles[0].from)

	return (
		<motion.li
			{...ANIMATE_PROPS}
			className="group/card relative overflow-hidden border-b border-line px-4 py-8 lg:px-8"
		>
			<span
				aria-hidden="true"
				className={`pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl transition-opacity duration-500 ${accent.glow} opacity-40 group-hover/card:opacity-100`}
			/>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-6 right-4 font-stack text-[120px] leading-none font-bold text-transparent select-none [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]"
			>
				{formatDate(start, { year: 'numeric' })}
			</span>

			<div className="relative flex flex-wrap items-center gap-2">
				{isOngoing && (
					<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
						<span className="relative flex h-1.5 w-1.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
							<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
						</span>
						Now
					</span>
				)}
				{timeline.location && (
					<span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
						📍 {timeline.location}
					</span>
				)}
			</div>

			<h2 className="relative mt-4 flex items-center text-3xl font-medium">
				{timeline.institution}
				{timeline.url && (
					<a
						href={timeline.url}
						target="_blank"
						rel="noreferrer"
						title={`Link to ${timeline.institution}`}
						className={`ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:rotate-12 hover:scale-110 hover:bg-white/10 ${accent.hover}`}
					>
						<LinkIcon size={16} className="stroke-current" />
					</a>
				)}
			</h2>

			<ol className="relative mt-6 flex flex-wrap gap-y-5">
				{roles.map((role, i) => {
					const current = !role.to
					const last = i === roles.length - 1
					return (
						<li key={role.from} className="relative min-w-40 pr-6">
							{!last && (
								<span
									aria-hidden="true"
									className="absolute top-[5px] left-5 right-1 h-px bg-linear-to-r from-white/25 to-white/10"
								/>
							)}
							{roles.length > 1 && (
								<span className="relative mb-3 flex h-2.5 w-2.5">
									{current && (
										<span
											className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${accent.dot}`}
										/>
									)}
									<span
										className={`relative h-2.5 w-2.5 rounded-full ${
											current ? accent.dot : 'border border-gray-500 bg-zinc-950'
										}`}
									/>
								</span>
							)}
							<p
								className={`text-base font-medium ${current ? 'text-white' : 'text-gray-400'}`}
							>
								{role.title}
							</p>
							<p className="mt-0.5 text-xs text-gray-500">
								{formatMonth(role.from)} – {role.to ? formatMonth(role.to) : 'Present'}
							</p>
						</li>
					)
				})}
			</ol>
		</motion.li>
	)
}

export default TimelineItem

const LinkIcon = ({ size = 18, ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<title>Link Icon</title>
		<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
		<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
	</svg>
)
