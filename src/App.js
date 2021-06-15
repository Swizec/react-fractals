import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { select as d3select, mouse as d3mouse } from "d3-selection";
import { scaleLinear } from "d3-scale";

import Pythagoras from "./Pythagoras";

class App extends Component {
    svg = {
        width: 1280,
        height: 600,
    };
    state = {
        treeSize: 0,
        baseW: 80,
        heightFactor: 0.55,
        lean: 0,
    };
    running = false;
    maxTreeSize = 11;

    changeTreeSize(event) {
        this.setState({
            treeSize: event.target.value,
        });
    }

    changeTreeLean(event) {
        console.log(event.target.value);
        this.setState({
            lean: event.target.value,
        });
    }

    // next() {
    //     const { currentMax } = this.state;

    //     if (currentMax < this.maxTreeSize) {
    //         this.setState({ currentMax: currentMax + 1 });
    //         setTimeout(this.next.bind(this), 500);
    //     }
    // }

    // Throttling approach borrowed from Vue fork
    // https://github.com/yyx990803/vue-fractal/blob/master/src/App.vue
    // rAF makes it slower than just throttling on React update
    // onMouseMove(event) {
    //     if (this.running) return;
    //     this.running = true;

    //     const [x, y] = d3mouse(this.refs.svg),
    //         scaleFactor = scaleLinear()
    //             .domain([this.svg.height, 0])
    //             .range([0, 0.8]),
    //         scaleLean = scaleLinear()
    //             .domain([0, this.svg.width / 2, this.svg.width])
    //             .range([0.5, 0, -0.5]);

    //     this.setState({
    //         heightFactor: scaleFactor(y),
    //         lean: scaleLean(x),
    //     });
    //     this.running = false;
    // }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>This is a dancing Pythagoras tree</h2>
                </div>
                <input
                    type="range"
                    value={this.state.lean}
                    onChange={(event) => this.changeTreeLean(event)}
                    min="-0.5"
                    max="0.5"
                    step="0.01"
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                        type="range"
                        value={this.state.treeSize}
                        onChange={(event) => this.changeTreeSize(event)}
                        min="0"
                        max={this.maxTreeSize}
                        step="1"
                        style={{
                            transform: "rotate(-90deg)",
                            width: this.svg.height / 2,
                        }}
                    />
                    <svg
                        width={this.svg.width}
                        height={this.svg.height}
                        ref="svg"
                        style={{ border: "1px solid lightgray" }}
                    >
                        <Pythagoras
                            w={this.state.baseW}
                            h={this.state.baseW}
                            heightFactor={this.state.heightFactor}
                            lean={this.state.lean}
                            x={this.svg.width / 2 - 40}
                            y={this.svg.height - this.state.baseW}
                            lvl={0}
                            maxlvl={this.state.treeSize}
                        />
                    </svg>
                </div>
            </div>
        );
    }
}

export default App;
