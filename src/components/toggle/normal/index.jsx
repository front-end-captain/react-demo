import React, { cloneElement, Children } from "react";
import classNames from "classnames";

import PanelWrapper from "./index.css.js";

const Panel = ({ onItemClick, title, active, children }) => {
  const contentClassNames = classNames("panel-content", {
    "panel-content-inactive": !active,
  });

  return (
    <PanelWrapper>
      <div className="panel-title" onClick={onItemClick}>{title}</div>
      <div className={contentClassNames}>{children}</div>
    </PanelWrapper>
  );
};

class Collapse extends React.Component {
  state = {
    activeKey: 1,
  };

  setActiveKey = (key) => {
    const { activeKey } = this.state;
    if (key === activeKey) {
      this.setState({ activeKey: 0 });
      return;
    }

    this.setState({ activeKey: key });
  };

  render() {
    const { children } = this.props;
    const { activeKey } = this.state;

    const newChildren = Children.map(children, (child, index) => {
      return cloneElement(child, {
        ...child.props,
        key: index,
        active: activeKey === (index + 1),
        onItemClick: () => this.setActiveKey(index + 1),
      });
    });

    return <>{newChildren}</>;
  }
}

Collapse.Panel = Panel;

export default Collapse;
