import React from "react";

import { DeleteIcon, RedoIcon, UndoIcon, PreviewIcon } from "./../icon/icon.jsx";
import TopActionsWrapper from "./topActions.css.js";

const TopActions = () => {
  return (
    <TopActionsWrapper>
      <li style={{ backgroundColor: "red" }}>
        <DeleteIcon />
      </li>
      <li>
        <RedoIcon />
      </li>
      <li>
        <UndoIcon />
      </li>
      <li style={{ backgroundColor: "green" }}>
        <PreviewIcon />
      </li>
    </TopActionsWrapper>
  );
};

export default TopActions;
