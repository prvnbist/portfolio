import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Lost extends Component {
    render() {
        return <div>Lost! <Link to='/'>Home</Link></div>
    }
}