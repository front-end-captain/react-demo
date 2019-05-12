import React from "react";
import { Link } from "@reach/router";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/user">User</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default Header;
