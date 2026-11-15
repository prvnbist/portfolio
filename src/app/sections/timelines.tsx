import type { Timeline } from '@/type'

import TimelineItem from './timeline_item'

// Hide the oldest entries from the page without deleting their data
const HIDDEN_ENTRIES = 4

export default function Timelines({ timelines }: { timelines: Timeline[] }) {
	return (
		<section className="w-full px-4 mx-auto lg:w-230 lg:px-8">
			<section>
				<ul className="-mx-4 border-t border-line lg:-mx-8">
					{timelines.slice(0, -HIDDEN_ENTRIES).map((timeline, index) => (
						<TimelineItem key={timeline.id} timeline={timeline} index={index} />
					))}
				</ul>
			</section>
		</section>
	)
}
