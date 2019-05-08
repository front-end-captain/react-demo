import React from "react";
import { Link } from "@reach/router";
import { Modal } from "antd";
import AnotherCounter from "./../Counter/anotherCounter.jsx";
import counterStore from "../Counter/modal";

const User = ({ children }) => {
  const visible = counterStore.useStore((S) => S.visible);
  return (
    <div>
      User
      <nav>
        <Link to="invoices">Invoices</Link>
        <Link to="team">Team</Link>
      </nav>
      <div>{children}</div>
      <AnotherCounter />
      <Modal
        visible={visible}
        onCancel={() => counterStore.dispatch(R => R.toggleVisible, false)}
      >
        <p>some contents</p>
        <p>some contents</p>
        <p>some contents</p>
      </Modal>
    </div>
  );
};

export default User;
