import React from "react"
import {Link} from 'gatsby';

const Navbar = () => {
    let checked = '';
    if(typeof window !== 'undefined') {
        if(!localStorage.getItem('theme')){
            localStorage.setItem('theme',JSON.stringify('light'));
        }
        else {
            checked = JSON.parse(localStorage.getItem('theme')) === 'dark' ? true : '';
        }
    }
    let html = null;
    if(typeof window !== 'undefined') {
        html = document.getElementsByTagName('html')[0];
        html.setAttribute('data-theme', JSON.parse(localStorage.getItem('theme')));
    }
    let toggleTheme = () => {
        if(typeof window !== 'undefined') {
            const selectedTheme = JSON.parse(localStorage.getItem('theme')) === "light" ? "dark" : "light";
            checked = selectedTheme === 'dark' ? true : '';
            localStorage['theme'] = JSON.stringify(selectedTheme);
            html.setAttribute("data-theme", selectedTheme);
        }
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
                        <label className="switch">
                            <input type="checkbox" id="themeSelect" defaultChecked={checked} onChange={() => toggleTheme()}/>
                            <span className="slider round"></span>
                        </label>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar



    