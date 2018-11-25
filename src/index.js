import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Import components
import Home from './components/Home'; 
import About from './components/About'; 
import Lost from './components/Lost'; 

// Import Styles
import './styles/index.scss';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="*" component={Lost} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render( <App/>, document.getElementById('root'));