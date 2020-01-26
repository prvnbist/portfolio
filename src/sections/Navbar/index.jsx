import React from 'react'
import { Link } from 'gatsby'

import { StyledNavbar, StyledNavItems, StyledNavItem } from './styles'

const Navbar = () => {
   let [current, setCurrent] = React.useState('')
   const [links] = React.useState([
      { title: 'Design', url: '/design' },
      { title: 'Code', url: '/code' },
      { title: 'Blog', url: '/blog' }
   ])
   return (
      <StyledNavbar>
         <div>
            <div>
               <Link to="/">
                  <HomeIcon size={24} />
               </Link>
            </div>
            <StyledNavItems>
               {links.map(link => (
                  <StyledNavItem key={link.url} isActive={link.url === current}>
                     <Link
                        to={link.url}
                        getProps={props =>
                           props.isCurrent && setCurrent(props.href)
                        }>
                        {link.title}
                     </Link>
                  </StyledNavItem>
               ))}
            </StyledNavItems>
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
      strokeLinejoin="round">
      <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
      <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
   </svg>
)
