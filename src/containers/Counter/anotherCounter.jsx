import React from "react";

import counterStore from "./modal.js";

const AnotherCounter = () => {
  const { count, times } = counterStore.useStore((S) => {
    return { count: S.count, times: S.times };
  });

  return (
    <div>
      <h2>AnotherCounter</h2>
      <span>Count: {count}</span>
      <br />
      <span>Times: {times}</span>
      <br />
      <button type="button" onClick={() => counterStore.dispatch((R) => R.addTimes)}>
        add times
      </button>
    </div>
  );
};

export default AnotherCounter;
