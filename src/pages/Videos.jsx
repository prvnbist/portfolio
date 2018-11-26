import React, {Fragment, Component} from 'react';

import Header from '../components/Header';
import Card from '../components/Card';

import data from '../components/data';

export default class Videos extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAllActive: true,
            isIllustrationActive: false,
            isAnimationActive: false,
            isMenuActive: false,
            isLayoutActive: false,
            term: 'code'
        }
    }
    showAll = () => {
        this.setState({
            isAllActive: true,
            isIllustrationActive: false,
            isAnimationActive: false,
            isMenuActive: false,
            isLayoutActive: false,
            term: 'code'
        })
    }
    showIllustration = () => {
        this.setState({
            isAllActive: false,
            isIllustrationActive: true,
            isAnimationActive: false,
            isMenuActive: false,
            isLayoutActive: false,
            term: 'illustration'
        })
    }
    showAnimation = () => {
        this.setState({
            isAllActive: false,
            isIllustrationActive: false,
            isAnimationActive: true,
            isMenuActive: false,
            isLayoutActive: false,
            term: 'animation'
        })
    }
    showMenu = () => {
        this.setState({
            isAllActive: false,
            isIllustrationActive: false,
            isAnimationActive: false,
            isMenuActive: true,
            isLayoutActive: false,
            term: 'menu'
        })
    }
    showLayout = () => {
        this.setState({
            isAllActive: false,
            isIllustrationActive: false,
            isAnimationActive: false,
            isMenuActive: false,
            isLayoutActive: true,
            term: 'layout'
        })
    }
    handleFilter = (keyword) => {
        return keyword.tags.includes(this.state.term);
    }
    render() {
        const dataList = data.filter(keyword => this.handleFilter(keyword));
        return (
            <Fragment>
                <Header title='Videos'/>
                <div className="wrapper">
                    <div className="filters">
                        <button onClick={this.showAll} className={this.state.isAllActive ? 'btn is-primary' : 'btn is-light'}>All</button>
                        <button onClick={this.showIllustration} className={this.state.isIllustrationActive ? 'btn is-primary' : 'btn is-light'}>Illustration</button>
                        <button onClick={this.showAnimation} className={this.state.isAnimationActive ? 'btn is-primary' : 'btn is-light'}>Animation</button>
                        <button onClick={this.showMenu} className={this.state.isMenuActive ? 'btn is-primary' : 'btn is-light'}>Menu</button>
                        <button onClick={this.showLayout} className={this.state.isLayoutActive ? 'btn is-primary' : 'btn is-light'}>Layout</button>
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