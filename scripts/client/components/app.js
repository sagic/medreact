import React from 'react'
import {Link} from 'react-router'

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {n: 0}
    }

    render() {
        return (
            <div>
                <h1>clicked {this.state.n} times</h1>
                <button onClick={this.handleClick.bind(this)}>click me!</button>
                <Link to="/test">Test</Link>
            </div>);
    }

    handleClick() {
        this.setState({n: this.state.n + 1})
    }
}