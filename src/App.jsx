import React, { Component } from "react";
import { hot } from "react-hot-loader/root";

import Home from "./containers/Home/home.jsx";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    if (error) {
      console.error(error, info);
      this.setState({ hasError: true });
    }
  }

  render() {
    const { hasError } = this.state;
    return hasError ? <div>something wrong</div> : <Home />;
  }
}

export default hot(App);
