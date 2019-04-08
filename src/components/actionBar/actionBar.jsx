import React from "react";

import { RotateIcon, DownIcon, UpIcon, ClearIcon } from "./../icon/icon.jsx";
import ActionBarWrapper from "./actionBar.css.js";

const ActionBar = () => {
  return (
    <ActionBarWrapper>
      <li>
        <RotateIcon />
      </li>
      <li>
        <DownIcon />
      </li>
      <li>
        <UpIcon />
      </li>
      <li style={{ backgroundColor: "red" }}>
        <ClearIcon />
      </li>
    </ActionBarWrapper>
  );
};

export default ActionBar;
