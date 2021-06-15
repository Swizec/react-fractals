import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Pythagoras from "./Pythagoras";

class App extends Component {
    svg = {
        width: 1280,
        height: 600,
    };
    state = {
        treeSize: 4,
        baseW: 80,
        heightFactor: 0.4,
        lean: 0,
    };
    running = false;
    maxTreeSize = 11;

    changeTreeSize(event) {
        this.setState({
            treeSize: Number(event.target.value),
        });
    }

    changeTreeLean(event) {
        this.setState({
            lean: -Number(event.target.value),
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header" style={{ marginBottom: "1rem" }}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>This is a dancing Pythagoras tree</h2>
                </div>
                <label>Lean the tree:</label>
                <br />
                <input
                    type="range"
                    value={this.state.lean}
                    onChange={(event) => this.changeTreeLean(event)}
                    min="-0.5"
                    max="0.5"
                    step="0.05"
                    style={{ width: this.svg.width / 3 }}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Grow the tree</label>
                        <input
                            type="range"
                            value={this.state.treeSize}
                            onChange={(event) => this.changeTreeSize(event)}
                            min="0"
                            max={this.maxTreeSize}
                            step="1"
                            style={{
                                transform: `rotate(-90deg) translate(-${
                                    this.svg.height / 2
                                }px, 0)`,
                                width: this.svg.height / 2,
                            }}
                        />
                    </div>

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
