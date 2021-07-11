import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { StyledNavbar, StyledNavItem } from './styles'

const Navbar = () => {
   const router = useRouter()
   const [links] = React.useState([
      { title: 'Design', url: '/design' },
      { title: 'Code', url: '/code' },
   ])
   return (
      <StyledNavbar>
         <div>
            <div>
               <Link href="/">
                  <a>
                     <HomeIcon size={24} />
                  </a>
               </Link>
            </div>
            <ul tw="flex">
               {links.map(link => (
                  <StyledNavItem
                     key={link.url}
                     isActive={router.pathname.includes(link.url)}
                  >
                     <Link href={link.url}>
                        <a>{link.title}</a>
                     </Link>
                  </StyledNavItem>
               ))}
               <StyledNavItem>
                  <a
                     target="_blank"
                     rel="noreferrer noopener"
                     href="https://blog.prvnbist.com"
                  >
                     Blog
                  </a>
               </StyledNavItem>
            </ul>
         </div>
      </StyledNavbar>
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
