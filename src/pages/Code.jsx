import React, {Fragment, Component} from 'react';

import Header from '../components/Header';

let codepenData = [
    {
        "title": "Sticky Navigation Menu With Smooth Scrolling",
        "link": "https://codepen.io/prvnbist/pen/GQMPZq",
        "id": "GQMPZq",
        "views": "27,050 Views",
        "loves": "531 Hearts",
        "comments": "6 Comments",
        "images": {
            "small": "http://codepen.io/prvnbist/pen/GQMPZq/image/small.png",
            "large": "http://codepen.io/prvnbist/pen/GQMPZq/image/large.png"
        }
    }, {
        "title": "UX in Motion | Animation",
        "link": "https://codepen.io/prvnbist/pen/zRMaeK",
        "id": "zRMaeK",
        "views": "8,397 Views",
        "loves": "421 Hearts",
        "comments": "0 Comments",
        "images": {
            "small": "http://codepen.io/prvnbist/pen/zRMaeK/image/small.png",
            "large": "http://codepen.io/prvnbist/pen/zRMaeK/image/large.png"
        }
    }, {
        "title": "#8. UI to Code - Star Wars Product Card",
        "link": "https://codepen.io/prvnbist/pen/GMLoGP",
        "id": "GMLoGP",
        "views": "11,832 Views",
        "loves": "266 Hearts",
        "comments": "6 Comments",
        "images": {
            "small": "http://codepen.io/prvnbist/pen/GMLoGP/image/small.png",
            "large": "http://codepen.io/prvnbist/pen/GMLoGP/image/large.png"
        }
    }, {
        "title": "Slide Out Navigation Menu",
        "link": "https://codepen.io/prvnbist/pen/NyLmeO",
        "id": "NyLmeO",
        "views": "7,773 Views",
        "loves": "272 Hearts",
        "comments": "2 Comments",
        "images": {
            "small": "http://codepen.io/prvnbist/pen/NyLmeO/image/small.png",
            "large": "http://codepen.io/prvnbist/pen/NyLmeO/image/large.png"
        }
    }, {
        "title": "Four Column Split Design",
        "link": "https://codepen.io/prvnbist/pen/vrzvNx",
        "id": "vrzvNx",
        "views": "5,180 Views",
        "loves": "158 Hearts",
        "comments": "0 Comments",
        "images": {
            "small": "http://codepen.io/prvnbist/pen/vrzvNx/image/small.png",
            "large": "http://codepen.io/prvnbist/pen/vrzvNx/image/large.png"
        }
    }, {
        "title": "Snapchat Tabs Switching",
        "link": "https://codepen.io/prvnbist/pen/QOLPYr",
        "id": "QOLPYr",
        "views": "5,217 Views",
        "loves": "134 Hearts",
        "comments": "3 Comments",
        "images": {
            "small": "http://codepen.io/prvnbist/pen/QOLPYr/image/small.png",
            "large": "http://codepen.io/prvnbist/pen/QOLPYr/image/large.png"
        }
    }
];

export default class Code extends Component {
    constructor(){
        super();
        this.state = {data: codepenData};
    }
    // componentDidMount() {
    //     fetch('https://api.github.com/users/prvnbist/repos')
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    //         .catch(err => console.log(err));
    // }
    render() {
        return (
            <Fragment>
                <Header title='Code'/>
                <div className="wrapper cards">
                    {                        
                        this.state.data.map((item,index) => 
                            <div className="card" key={index}>
                                <i className='fa fa-codepen'></i>
                                <a href={item.link}>{item.title}</a>  
                            </div>
                        )
                    }

                </div>
            </Fragment>
        );
    }
}