import React, { useRef, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { select as d3select, mouse as d3mouse } from "d3-selection";
import { scaleLinear } from "d3-scale";

import Pythagoras from "./Pythagoras";

const SVG_DIMENSIONS = {
    width: 1280,
    height: 600,
};
const MAX_RECURSION = 11;

function App() {
    const [state, setState] = useState({
        currentMax: 0,
        baseW: 80,
        heightFactor: 0,
        lean: 0,
    });
    const svgRef = useRef(null);

    // grows tree until max recursion level is reached
    function growTree() {
        // this pattern allows us to access the actual current state
        setState((state) => {
            if (state.currentMax < MAX_RECURSION) {
                setTimeout(growTree, 500);
                return {
                    ...state,
                    currentMax: state.currentMax + 1,
                };
            } else {
                // must always return state from setState call :)
                return state;
            }
        });
    }

    function onMouseMove(event) {
        const [x, y] = d3mouse(svgRef.current),
            scaleFactor = scaleLinear()
                .domain([SVG_DIMENSIONS.height, 0])
                .range([0, 0.8]),
            scaleLean = scaleLinear()
                .domain([0, SVG_DIMENSIONS.width / 2, SVG_DIMENSIONS.width])
                .range([0.5, 0, -0.5]);

        // these are batched?
        setState((state) => ({
            ...state,
            heightFactor: scaleFactor(y),
            lean: scaleLean(x),
        }));
    }

    // the old componentDidMount
    useEffect(() => {
        d3select(svgRef.current).on("mousemove", onMouseMove);

        growTree();
    }, [svgRef]);

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>This is a dancing Pythagoras tree</h2>
            </div>
            <p className="App-intro">
                <svg
                    width={SVG_DIMENSIONS.width}
                    height={SVG_DIMENSIONS.height}
                    ref={svgRef}
                    style={{ border: "1px solid lightgray" }}
                >
                    <Pythagoras
                        w={state.baseW}
                        h={state.baseW}
                        heightFactor={state.heightFactor}
                        lean={state.lean}
                        x={SVG_DIMENSIONS.width / 2 - 40}
                        y={SVG_DIMENSIONS.height - state.baseW}
                        lvl={0}
                        maxlvl={state.currentMax}
                    />
                </svg>
            </p>
        </div>
    );
}

// class App extends Component {
//     componentDidMount() {}

//     // // Throttling approach borrowed from Vue fork
//     // // https://github.com/yyx990803/vue-fractal/blob/master/src/App.vue
//     // // rAF makes it slower than just throttling on React update
//     // onMouseMove(event) {
//     //     if (this.running) return;
//     //     this.running = true;

//     //     const [x, y] = d3mouse(this.refs.svg),
//     //         scaleFactor = scaleLinear()
//     //             .domain([this.svg.height, 0])
//     //             .range([0, 0.8]),
//     //         scaleLean = scaleLinear()
//     //             .domain([0, this.svg.width / 2, this.svg.width])
//     //             .range([0.5, 0, -0.5]);

//     //     this.setState({
//     //         heightFactor: scaleFactor(y),
//     //         lean: scaleLean(x),
//     //     });
//     //     this.running = false;
//     // }

//     render() {

//     }
// }

export default App;
