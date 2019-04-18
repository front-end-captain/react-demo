import React from "react";
import ReactDOM from "react-dom";

import App from "./App.jsx";

// import "./lib/example1";

const root = document.getElementById("root");
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(<Component />, root);
};

render(App);
