import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";

// Import components
import Home from './components/Home'; 
import About from './components/About'; 

// Import Styles
import './styles/index.scss';

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" exact component={About}/>
                </Fragment>
            </Router>
        );
    }
}

ReactDOM.render( <App/>, document.getElementById('root'));