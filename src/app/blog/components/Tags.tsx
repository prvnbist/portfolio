'use client'

import { twJoin, twMerge } from 'tailwind-merge'
import { useRouter, useSearchParams } from 'next/navigation'

const Tags = ({ tags }: { tags: string[] }) => {
   const router = useRouter()
   const params = useSearchParams()

   const activeTag = params.get('tag')

   const setTag = (tag: string) => {
      const _params = new URLSearchParams(params)

      if (tag === activeTag) {
         _params.delete('tag')
      } else {
         _params.set('tag', tag)
      }
      router.push(`/blog?${_params.toString()}`)
   }

   return (
      <section className="mt-4 mb-2 flex flex-col gap-3">
         <h3>Tags</h3>
         <ul className="flex flex-wrap gap-2">
            {tags.map(tag => (
               <li
                  key={tag}
                  onClick={() => setTag(tag)}
                  className={twMerge(
                     twJoin(
                        'text-sm cursor-pointer inline-flex bg-dark-200 rounded-full px-2 py-[2px] text-gray-400',
                        activeTag === tag && 'text-black bg-yellow-400'
                     )
                  )}
               >
                  {tag}
               </li>
            ))}
         </ul>
      </section>
   )
}

export default Tags
