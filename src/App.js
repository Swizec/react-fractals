import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { select as d3select, mouse as d3mouse } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

import Pythagoras from './Pythagoras';

class App extends Component {
    svg = {
        width: 1280,
        height: 600
    };
    state = {
        currentMax: 0,
        baseHeight: 2,
        heightFactor: 0,
        lean: 0
    };

    realMax = 10;

    componentDidMount() {
        d3select(this.refs.svg).on("mousemove", this.onMouseMove.bind(this));

        this.next();
    }

    next() {
        const { currentMax } = this.state;

        if (currentMax < this.realMax) {
            this.setState({currentMax: currentMax + 1});
            setTimeout(this.next.bind(this), 500);
        }
    }

    onMouseMove(event) {
        const [x, y] = d3mouse(this.refs.svg),
              scaleY = scaleLinear().domain([this.svg.height, this.svg.height/2])
                                    .range([2, 100]),

              scaleFactor = scaleLinear().domain([this.svg.height, 0])
                                         .range([0, .8]),

              scaleLean = scaleLinear().domain([0, this.svg.width/2, this.svg.width])
                                       .range([.5, 0, -.5]);

        console.log(scaleLean(x));

        this.setState({
            baseHeight: scaleY(y),
            heightFactor: scaleFactor(y),
            lean: scaleLean(x)
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>This is a dancing Pythagoras tree</h2>
                </div>
                <p className="App-intro">
                    <svg width={this.svg.width} height={this.svg.height} ref="svg">

                        <Pythagoras w={80}
                                    h={this.state.baseHeight}
                                    heightFactor={this.state.heightFactor}
                                    lean={this.state.lean}
                                    x={this.svg.width/2-40}
                                    y={this.svg.height-this.state.baseHeight}
                                    lvl={0}
                                    maxlvl={this.state.currentMax}/>

                    </svg>
                </p>
            </div>
        );
    }
}

export default App;
