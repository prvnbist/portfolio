import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <nav>
                <NavLink activeClassName='active-link' exact={true} to="/">Home</NavLink>
                <NavLink activeClassName='active-link' to="/code">Code</NavLink>
                {/* <NavLink activeClassName='active-link' to="/design">Design</NavLink> */}
                <NavLink activeClassName='active-link' to="/videos">Videos</NavLink>
            </nav>
        );
    }
}