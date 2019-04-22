import React from "react";
import { Router } from "@reach/router";

const createRouteTable = (routes) => {
  return routes.map((route) => {
    const { component: Component, path, children } = route;
    if (Array.isArray(children) && children.length > 0) {
      return (
        <Component path={path} key={path}>
          {createRouteTable(children)}
        </Component>
      );
    }

    return <Component path={path} key={path} />;
  });
};

const AppRouter = ({ notFound: NotFound, routes }) => {
  const renderNotFound = () => <NotFound default />;
  return (
    <Router>
      {createRouteTable(routes)}
      {renderNotFound()}
    </Router>
  );
};

AppRouter.defaultProps = {
  notFound: () => <span>oops. something wrong</span>,
};

export default AppRouter;
