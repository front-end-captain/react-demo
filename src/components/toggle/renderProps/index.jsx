import React from "react";
import classNames from "classnames";

import PanelWrapper from "./../normal/index.css.js";

class UseToggle extends React.Component {
  state = {
    active: true,
  };

  toggle = () => {
    this.setState((prevState) => {
      return { active: !prevState.active };
    });
  };

  render() {
    const { children } = this.props;
    const { active } = this.state;
    const renderProps = { active, handleToggle: this.toggle };

    if (typeof children === "function") {
      return children(renderProps);``
    }

    return null;
  }
}

const Panel = ({ title, children }) => {
  return (
    <UseToggle>
      {({ active, handleToggle }) => {
        const contentClassNames = classNames("panel-content", {
          "panel-content-inactive": !active,
        });

        return (
          <PanelWrapper>
            <div className="panel-title" onClick={handleToggle}>
              {title}
            </div>
            <div className={contentClassNames}>{children}</div>
          </PanelWrapper>
        );
      }}
    </UseToggle>
  );
};

// REVIEW 给每一个 child 加一个 key; 默认第一个展开，其余折叠
const Collapse = ({ children }) => children;
Collapse.Panel = Panel;

export default Collapse;
