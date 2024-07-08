import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "./store";

const overmind = createOvermind(config, {
  devtools: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider value={overmind}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>
);
