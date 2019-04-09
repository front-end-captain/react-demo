import React, { useState } from "react";
import classNames from "classnames";

import PanelWrapper from "./../normal/index.css.js";

const useToggle = () => {
  const [active, toggle] = useState(true);

  const handleToggle = () => toggle(!active);

  return { active, handleToggle };
};

const Panel = ({ children, title }) => {
  const { active, handleToggle } = useToggle();

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
};

// REVIEW 给每一个 child 加一个 key; 默认展开
const Collapse = ({ children }) => children;

Collapse.Panel = Panel;

export default Collapse;
