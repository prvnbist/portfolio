import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class About extends Component {
    render() {
        return <div>About! <Link to='/'>Home</Link></div>
    }
}