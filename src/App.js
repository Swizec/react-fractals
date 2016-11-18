import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Pythagoras from './Pythagoras';

class App extends Component {
    state = {
        currentMax: 0,
    };

    realMax = 13;

    componentDidMount() {
        this.next();
    }

    next() {
        const { currentMax } = this.state;

        if (currentMax < this.realMax) {
            this.setState({currentMax: currentMax + 1});
            setTimeout(this.next.bind(this), 500);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>This is a Pythagoras tree</h2>
                </div>
                <p className="App-intro">
                    <svg width="640" height="480">

                        <Pythagoras w={100}
                                    x={320-50}
                                    y={480-100}
                                    lvl={0}
                                    maxlvl={this.state.currentMax}/>

                    </svg>
                </p>
            </div>
        );
    }
}

export default App;
