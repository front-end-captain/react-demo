import React, { useState } from "react";

const StateHook = () => {
  const [count, setCount] = useState(0);
  const [position, updatePosition] = useState({ left: 0, top: 0 });

  return (
    <div>
      <p>you clicked {count} times</p>
      <p>The position is Left: {position.left}, Right: {position.top}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <button type="button" onClick={() => updatePosition({ left: 100, top: 100 })}>
        Update position
      </button>
    </div>
  );
};

export default StateHook;
