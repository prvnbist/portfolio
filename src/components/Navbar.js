import React from "react"
import {Link} from 'gatsby';

const Navbar = () => <nav>
    <div className="center">
        <div id="brand">
            <Link to="/"><img
                src="https://res.cloudinary.com/prvnbist/image/upload/v1559588280/portfolio/logo.png"
                alt="Praveen Bisht"/></Link>
        </div>
        <ul>
            <li>
                <Link to="/design" activeClassName="active">Design</Link>
            </li>
            <li>
                <Link to="/code" activeClassName="active">Code</Link>
            </li>
            <li>
                <Link to="/video" activeClassName="active">Video</Link>
            </li>
            <li>
                <Link to="/blog" activeClassName="active">Blog</Link>
            </li>
        </ul>
    </div>
</nav>

export default Navbar