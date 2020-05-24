import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// The old way without concurrent mode
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

// Concurrent mode enabled
ReactDOM.unstable_createRoot(document.getElementById("root")).render(<App />);
