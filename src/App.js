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
    const maxTreeSize = 22;

    // we split state in two so we can update
    // visuals and inputs separately
    const [treeSizeInput, setTreeSizeInput] = useState(8);
    const [treeSize, setTreeSize] = useState(8);

    const [treeLeanInput, setTreeLeanInput] = useState(0);
    const [treeLean, setTreeLean] = useState(0);
    const [isLeaning, startLeaning] = useTransition();

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
                <h2 style={{ marginTop: "-0.2rem" }}>
                    This is a leaning Pythagoras tree
                    <br />
                    <small>
                        {Number(2 ** treeSize - 1).toLocaleString()} squares
                    </small>
                </h2>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                    <label>
                        Use startTransition
                        <br />
                        <input
                            type="checkbox"
                            checked={enableStartTransition}
                            onChange={toggleStartTransition}
                        />
                    </label>
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
                    <label>
                        Make each square block the thread for 0.1ms
                        <br />
                        <input
                            type="checkbox"
                            checked={enableSlowdown}
                            onChange={toggleSlowdown}
                        />
                    </label>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: 130 }}>
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
                            }px, -90px)`,
                            width: svg.height / 2,
                        }}
                    />
                </div>

                <svg
                    width={svg.width}
                    height={svg.height}
                    className={isLeaning ? "pending" : "done"}
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
            <div className="explanation">
                <h1>What this demo shows</h1>

                <p>
                    The demo shows you what happens when every state change
                    updates 1,000,000+ nodes. Slider on the left grows the tree,
                    makes the problem worse – exponentially. Slider on top leans
                    the tree, updates every node. Use it to see what happens :)
                </p>
                <p>
                    Toggle the `Use startTransition` checkbox to compare
                    behavior with and without the new feature. You should see
                    your inputs laaaaaag without `startTransition`. When it's
                    enabled, the urgent input update happens fast and the slow
                    fractal updates later.
                </p>
                <p>
                    If you don't see slowness, enable the artificial 0.1ms
                    delay. That'll do it.
                </p>
                <p>
                    <a href="https://swizec.com/blog/a-better-react-18-starttransition-demo/">
                        Read deeper explanation and startTransition gotchas on
                        Swizec's blog 👉
                    </a>
                </p>
                <p></p>
                <p>
                    Built by <a href="https://twitter.com/swizec">@swizec</a>
                </p>
            </div>
        </div>
    );
}

export default App;
