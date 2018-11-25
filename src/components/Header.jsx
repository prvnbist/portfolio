import React, {Component} from 'react';

import Menu from './Menu';

export default class Header extends Component {
    render() {
        return (
            <div className='wrapper-fluid blue-header'>
                <div className="wrapper blue-header">
                    <Menu />
                    <h1>{this.props.title}</h1>
                    <div className="tabs">
                        <button className='activeTab'></button>
                        <button></button>
                    </div>
                </div>
            </div>
        );
    }
}
