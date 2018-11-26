import React, {Fragment, Component} from 'react';

import Header from '../components/Header';
import Card from '../components/Card';

import data from '../components/data';

export default class Code extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAllActive: true,
            isIllustrationActive: false,
            isAnimationActive: false,
            term: 'code'
        }
    }
    showAll = () => {
        this.setState({
            isAllActive: true,
            isIllustrationActive: false,
            isAnimationActive: false,
            term: 'code'
        })
    }
    showIllustration = () => {
        this.setState({
            isAllActive: false,
            isIllustrationActive: true,
            isAnimationActive: false,
            term: 'illustration'
        })
    }
    showAnimation = () => {
        this.setState({
            isAllActive: false,
            isIllustrationActive: false,
            isAnimationActive: true,
            term: 'animation'
        })
    }
    handleFilter = (keyword) => {
        return keyword.tags.includes(this.state.term);
    }
    render() {
        const dataList = data.filter(keyword => this.handleFilter(keyword));
        return (
            <Fragment>
                <Header title='Code'/>
                <div className="wrapper">
                    <div className="filters">
                        <button onClick={this.showAll} className={this.state.isAllActive ? 'btn is-primary' : 'btn is-light'}>All</button>
                        <button onClick={this.showIllustration} className={this.state.isIllustrationActive ? 'btn is-primary' : 'btn is-light'}>Illustration</button>
                        <button onClick={this.showAnimation} className={this.state.isAnimationActive ? 'btn is-primary' : 'btn is-light'}>Animation</button>
                    </div>
                </div>
                <div className="wrapper cards">
                    {
                        dataList.map((item, index) => <Card data={item} index={index}/>)
                    }
                </div>
            </Fragment>
        );
    }
}