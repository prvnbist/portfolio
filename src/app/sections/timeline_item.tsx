'use client'

import { motion } from 'framer-motion'

import type { Timeline } from '@/type'

const ANIMATE_PROPS = {
   initial: { opacity: 0, y: 20 },
   whileInView: { opacity: 1, y: 0 },
   transition: { duration: 0.5 },
   viewport: { once: true },
}

const TimelineItem = ({ timeline }: { timeline: Timeline }) => {
   return (
      <motion.li {...ANIMATE_PROPS}>
         {timeline.location && (
            <span className="text-gray-400 font-medium text-sm uppercase">
               {timeline.location}
            </span>
         )}
         <header className="mb-2 md:flex md:justify-between">
            <h3 className="text-lg flex">
               {timeline.title}
               {timeline.url && (
                  <a
                     href={timeline.url}
                     target="_blank"
                     title={`Link to ${timeline.title}`}
                     className="ml-1 h-8 w-8 flex items-center justify-center rounded hover:bg-gray-800"
                  >
                     <LinkIcon size={16} className="stroke-current" />
                  </a>
               )}
            </h3>
            {timeline.from && (
               <section className="mt-1 md:mt-0 text-yellow-400">
                  <span>
                     {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                     }).format(new Date(timeline.from))}
                  </span>
                  {timeline.to && ` - `}
                  {timeline.to && (
                     <span>
                        {new Intl.DateTimeFormat('en-US', {
                           year: 'numeric',
                           month: 'short',
                        }).format(new Date(timeline.to))}
                     </span>
                  )}
                  {timeline.is_current && <span> - Present</span>}
               </section>
            )}
         </header>
         <p className="mb-4 text-[18px] text-gray-400">
            {timeline.description}
         </p>
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
   </svg>
)
