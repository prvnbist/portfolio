/* eslint-disable no-useless-constructor */
import React, {Component} from 'react';

import Menu from '../components/Menu';

import TypeIt from 'typeit';

let socialLinks = [
    {
        name: 'Dribbble',
        link: 'https://www.dribbble.com/prvnbist'
    }, {
        name: 'Codepen',
        link: 'https://www.codepen.io/prvnbist'
    }, {
        name: 'Twitter',
        link: 'https://www.twitter.com/prvnbist'
    }, {
        name: 'Github',
        link: 'https://www.github.com/prvnbist'
    }, {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/prvnbist/'
    }, {
        name: 'Youtube',
        link: 'https://www.youtube.com/prvnbist/videos'
    }
];

export default class Home extends Component {
    componentDidMount() {
        new TypeIt('.hero-skills', {
            strings: ['User Interface Design.','User Experience Design.','Front-End Development.'],
            speed: 200,
            breakLines: false,
            autoStart: false,
            loop:true,
            lifeLike:true
        });
    }

    render() {
        return (
            <div className='wrapper align'>
                <Menu/>
                <div className='hero'>
                    <h1 className='tag-line'>Hello, I’m Praveen.<br />
                        I live in New Delhi, India <br />& I do 
                        <span className='hero-skills'></span>
                    </h1>
                    <button className="cta">
                        <a href="mailto:prvnbist@gmail.com">Say Hello!</a>
                        <span role="img" aria-label="yo">✌</span>
                    </button>
                </div>
                <footer>
                    {
                        socialLinks.map((key,index) => <a href={key.link} key={index}>{key.name}</a>)
                    }
                </footer>
            </div>
        );
    }
}