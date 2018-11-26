import React, {Component} from 'react';

export default class Card extends Component {
    render() {        
        const bgColors = ["#9437AD", "#19E151", "#322DFE", "#13A0CC", "#ED5151"];
        return (
            <div className="card" key={this.props.index}>
                <div className="info">
                    <div className="title">
                        <span
                            style={{
                            backgroundColor: `${bgColors[Math.floor(Math.random() * bgColors.length)]}`
                        }}>{this.props.data.title}</span>
                    </div>
                    <div className="links">
                        {this.props.data.demo && <a href={this.props.data.demo}>DEMO</a>}
                        {this.props.data.video && <a href={this.props.data.video}>YOUTUBE</a>}
                    </div>
                </div>
            </div>
        );
    }
}
