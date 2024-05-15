'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils'

const LINKS = [
   { title: 'Code', url: '/code' },
   { title: 'Design', url: '/design' },
   { title: 'Blog', url: '/blog' },
]

const Navbar = () => {
   const pathname = usePathname()
   return (
      <nav className="sticky top-0 h-16 w-screen bg-dark-400 border-b border-dark-300 z-[1000]">
         <div className="px-4 w-full lg:px-0 lg:w-[980px] h-16 flex mx-auto items-center justify-between">
            <Link href="/" title="Home" aria-label="Home">
               <HomeIcon size={24} />
            </Link>
            <section className="flex gap-4">
               {LINKS.map(link => (
                  <Link
                     href={link.url}
                     key={link.url}
                     className={cn(
                        'text-white font-regular tracking-wide',
                        pathname.includes(link.url) && 'text-yellow-400'
                     )}
                  >
                     {link.title}
                  </Link>
               ))}
            </section>
         </div>
      </nav>
   )
}

export default Navbar

const HomeIcon = ({ size = 16, color = '#fff' }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
      <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
   </svg>
)
