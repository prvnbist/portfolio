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
                  <img
                     width="32"
                     src="https://res.cloudinary.com/prvnbist/image/upload/v1559588280/portfolio/logo.png"
                     alt="Praveen Bisht"
                  />
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
