import React, {Fragment, Component} from 'react';

import Header from '../components/Header';

import data from '../components/data';

export default class Videos extends Component {
    render() {
        const bgColors = ["#9437AD", "#19E151", "#322DFE", "#13A0CC", "#ED5151"];
        console.log(data)
        return (
            <Fragment>
                <Header title='Videos'/>
                <div className="wrapper cards">
                    {
                        data.map((item, index) => {
                            
                            if(item.tags.includes('video')) {
                                return (
                                    <div className="card" key={index}>
                                        <div className="info">
                                            <div className="title">
                                                <span
                                                    style={{
                                                    backgroundColor: `${bgColors[Math.floor(Math.random() * bgColors.length)]}`
                                                }}>{item.title}</span>
                                            </div>
                                            <div className="links">
                                                {item.demo && <a href={item.demo}>CODE</a>}
                                                {item.video && <a href={item.video}>YOUTUBE</a>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return true;
                        })
                    }
                </div>
            </Fragment>
        );
    }
}