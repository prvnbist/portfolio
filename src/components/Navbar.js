import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => {
   const [links] = React.useState([
      { title: 'Design', url: '/design' },
      { title: 'Code', url: '/code' },
      { title: 'Blog', url: '/blog' }
   ])
   return (
      <nav>
         <div>
            <div>
               <Link to="/">
                  <img
                     src="https://res.cloudinary.com/prvnbist/image/upload/v1559588280/portfolio/logo.png"
                     alt="Praveen Bisht"
                  />
               </Link>
            </div>
            <ul>
               {links.map(link => (
                  <li key={link.url}>
                     <Link to={link.url}>{link.title}</Link>
                  </li>
               ))}
            </ul>
         </div>
      </nav>
   )
}

export default Navbar
