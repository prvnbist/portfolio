import React from 'react'
import { Link } from 'gatsby'

import { StyledNavbar, StyledNavItems, StyledNavItem } from './styles'

import Logo from '../../images/sign.png'

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
                  <img width="64" src={Logo} alt="Praveen Bisht" />
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
