import React from "react";
import { Link } from "@reach/router";

const User = ({ children }) => {
  return (
    <div>
      User
      <nav>
        <Link to="invoices">Invoices</Link>
        <Link to="team">Team</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default User;
