'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'

import type { Skill } from '@/type'

const ANIMATE_PROPS = {
   initial: { opacity: 0, y: 20 },
   whileInView: { opacity: 1, y: 0 },
   transition: { duration: 0.5 },
   viewport: { once: true },
}

export default function Skills({
   skills,
}: {
   skills: Record<string, Record<string, Array<Skill>>>
}) {
   return (
      <section className="w-full px-4 mx-auto lg:w-[980px]">
         <section className="mt-16">
            <h2 className="text-3xl mb-4">Skills</h2>
            <ul>
               {Object.keys(skills).map((key, index) => (
                  <motion.li key={key} {...ANIMATE_PROPS}>
                     <h3 className="mb-1 text-gray-400 uppercase font-medium tracking-wider">
                        {key}
                     </h3>
                     {Object.keys(skills[key]).map(sub_key => (
                        <Fragment key={sub_key}>
                           <h4 className="mb-1 text-yellow-300">{sub_key}</h4>
                           <ul className="mb-4 flex flex-wrap gap-3">
                              {skills[key][sub_key].map((skill: any) => (
                                 <li
                                    key={skill.id}
                                    className="flex-shrink-0 items-start px-3 py-1 border border-gray-800 rounded"
                                 >
                                    {skill.title}
                                 </li>
                              ))}
                           </ul>
                        </Fragment>
                     ))}
                  </motion.li>
               ))}
            </ul>
         </section>
      </section>
   )
}
