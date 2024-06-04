import type { Timeline } from '@/type'

import TimelineItem from './timeline_item'

export default function Timelines({ timelines }: { timelines: Timeline[] }) {
   return (
      <section className="w-full px-4 mx-auto lg:w-[980px]">
         <section className="mt-16">
            <h2 className="text-3xl mb-4">Timeline</h2>
            <ul className="space-y-6">
               {timelines.map(timeline => (
                  <TimelineItem key={timeline.id} timeline={timeline} />
               ))}
            </ul>
         </section>
      </section>
   )
}
