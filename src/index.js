import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

class App extends React.Component {
    render() {
        return (
            <div className="App"><h1>Hello</h1></div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root'));