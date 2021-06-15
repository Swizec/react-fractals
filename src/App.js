import React, { Component, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Pythagoras from "./Pythagoras";

function App() {
    const svg = {
        width: 1280,
        height: 600,
    };
    const baseWidth = 80;
    const heightFactor = 0.4;
    const maxTreeSize = 20;

    // we split state in two so we can update
    // visuals and inputs separately
    const [treeSizeInput, setTreeSizeInput] = useState(8);
    const [treeSize, setTreeSize] = useState(8);

    const [treeLeanInput, setTreeLeanInput] = useState(0);
    const [treeLean, setTreeLean] = useState(0);

    const [enableStartTransition, setEnableStartTransition] = useState(false);

    function changeTreeSize(event) {
        const value = Number(event.target.value);
        setTreeSizeInput(value); // update input

        // update visuals
        if (enableStartTransition) {
            React.startTransition(() => {
                setTreeSize(value);
            });
        } else {
            setTreeSize(value);
        }
    }

    function changeTreeLean(event) {
        const value = Number(event.target.value);
        setTreeLeanInput(value); // update input

        // update visuals
        if (enableStartTransition) {
            React.startTransition(() => {
                setTreeLean(value);
            });
        } else {
            setTreeLean(value);
        }
    }

    function toggleStartTransition() {
        setEnableStartTransition(!enableStartTransition);
    }

    return (
        <div className="App">
            <div className="App-header" style={{ marginBottom: "1rem" }}>
                <img src={logo} className="App-logo" alt="logo" />
                <h2>This is a leaning Pythagoras tree</h2>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <div>
                    <label>Use startTransition</label>
                    <br />
                    <input
                        type="checkbox"
                        selected={enableStartTransition}
                        onChange={toggleStartTransition}
                    />
                </div>
                <div>
                    <label>Lean the tree:</label>
                    <br />
                    <input
                        type="range"
                        value={treeLeanInput}
                        onChange={changeTreeLean}
                        min="-0.5"
                        max="0.5"
                        step="0.05"
                        style={{ width: svg.width / 3 }}
                    />
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>
                        Grow the tree
                        <br />
                        Bigger is slower
                    </label>
                    <input
                        type="range"
                        value={treeSizeInput}
                        onChange={changeTreeSize}
                        min="0"
                        max={maxTreeSize}
                        step="1"
                        style={{
                            transform: `rotate(-90deg) translate(-${
                                svg.height / 2
                            }px, 0)`,
                            width: svg.height / 2,
                        }}
                    />
                </div>

                <svg
                    width={svg.width}
                    height={svg.height}
                    style={{ border: "1px solid lightgray" }}
                >
                    <Pythagoras
                        w={baseWidth}
                        h={baseWidth}
                        heightFactor={heightFactor}
                        lean={-treeLean}
                        x={svg.width / 2 - 40}
                        y={svg.height - baseWidth}
                        lvl={0}
                        maxlvl={treeSize}
                    />
                </svg>
            </div>
        </div>
    );
}

export default App;
