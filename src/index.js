import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Code from './pages/Code.jsx';
// import Design from './pages/Design.jsx';
import Videos from './pages/Videos.jsx';

import './styles/styles.scss';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/code' component={Code} />
            {/* <Route path='/design' component={Design} /> */}
            <Route path='/videos' component={Videos} />
        </Switch>
    </Router>, document.getElementById('root'));