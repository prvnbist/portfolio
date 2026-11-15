import { CardGlow, Icon, Pill, Reveal } from '@/components/ui'
import { accentAt } from '@/lib/accents'
import { formatDate } from '@/lib/format'
import type { Timeline } from '@/type'

const formatMonth = (date: string) => formatDate(date, { year: 'numeric', month: 'short' })

const TimelineItem = ({ timeline, index = 0 }: { timeline: Timeline; index?: number }) => {
	const accent = accentAt(index)
	// roles are listed newest first, so reverse for a "career path" reading order
	const roles = [...timeline.duration].reverse()
	const isOngoing = roles.some(role => !role.to)
	const start = roles.reduce((min, role) => (role.from < min ? role.from : min), roles[0].from)

	return (
		<Reveal
			as="li"
			className="group/card relative overflow-hidden border-b border-line px-4 py-8 lg:px-8"
		>
			<CardGlow index={index} mode="rest" className="h-56 w-56" />
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-6 right-4 font-stack text-[120px] leading-none font-bold text-transparent select-none [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]"
			>
				{formatDate(start, { year: 'numeric' })}
			</span>

			<div className="relative flex flex-wrap items-center gap-2">
				{isOngoing && (
					<Pill variant="success">
						<span className="relative flex h-1.5 w-1.5">
							<span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-emerald-400 opacity-75" />
							<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
						</span>
						Now
					</Pill>
				)}
				{timeline.location && <Pill>📍 {timeline.location}</Pill>}
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
						<Icon name="link" className="size-4" />
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
											className={`absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full opacity-60 ${accent.dot}`}
										/>
									)}
									<span
										className={`relative h-2.5 w-2.5 rounded-full ${
											current ? accent.dot : 'border border-gray-500 bg-bg'
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
		</Reveal>
	)
}

export default TimelineItem
