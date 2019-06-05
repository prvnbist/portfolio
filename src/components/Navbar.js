import React from "react"
import {Link} from 'gatsby';

const Navbar = () => {
    let checked = '';
    if(!localStorage.getItem('theme')){
        localStorage.setItem('theme',JSON.stringify('light'));
    }
    else {
        checked = JSON.parse(localStorage.getItem('theme')) === 'dark' ? true : '';
    }
    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('data-theme', JSON.parse(localStorage.getItem('theme')));
    let toggleTheme = () => {
        const selectedTheme = JSON.parse(localStorage.getItem('theme')) === "light" ? "dark" : "light";
        checked = selectedTheme === 'dark' ? true : '';
        localStorage['theme'] = JSON.stringify(selectedTheme);
        html.setAttribute("data-theme", selectedTheme);
    }
    return (
        <nav>
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
                    <li>
                        <label class="switch">
                            <input type="checkbox" id="themeSelect" defaultChecked={checked} onChange={() => toggleTheme()}/>
                            <span class="slider round"></span>
                        </label>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar



    