import React, { useState, useTransition } from "react";
import logo from "./logo.svg";
import LagRadar from "react-lag-radar";
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
    const [isLeaning, startLeaning] = useTransition()

    const [enableStartTransition, setEnableStartTransition] = useState(false);
    const [enableSlowdown, setEnableSlowdown] = useState(false);

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
            startLeaning(() => {
                setTreeLean(value);
            });
        } else {
            setTreeLean(value);
        }
    }

    function toggleStartTransition(event) {
        setEnableStartTransition(event.target.checked);
    }

    function toggleSlowdown(event) {
        setEnableSlowdown(event.target.checked);
    }

    return (
        <div className="App">
            <div className="App-header" style={{ marginBottom: "1rem" }}>
                <LagRadar />
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
                        checked={enableStartTransition}
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
                <div>
                    <label>Make each square block the thread for 0.1ms</label>
                    <br />
                    <input
                        type="checkbox"
                        checked={enableSlowdown}
                        onChange={toggleSlowdown}
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
                    className={isLeaning ? 'pending' : 'done'}
                    style={{
                        border: "1px solid lightgray",
                    }}
                >
                    <Pythagoras
                        enableSlowdown={enableSlowdown}
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
