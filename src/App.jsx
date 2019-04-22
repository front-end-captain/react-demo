import React, { Component } from "react";
import { hot } from "react-hot-loader/root";

import Header from "./containers/Header/header.jsx";
import NotFound from "./components/NotFound/index.jsx";
import AppRouter from "./router/index.js";
import routes from "./router/config.js";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
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
    if (hasError) {
      return <div>something wrong</div>;
    }

    return (
      <>
        <Header />
        <AppRouter notFound={NotFound} routes={routes} />
      </>
    );
  }
}

export default hot(App);
