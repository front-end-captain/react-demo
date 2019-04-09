import React, { useState, useEffect } from "react";

const effectHook = () => {
  // const [count, setCount] = useState(0);

  let flag = true;

  const initCount = { times: 0, count: 0 };
  const [count, setCount] = useState(initCount);

  useEffect(() => {
    document.title = `you clicked ${count.times} times`;
  }, [count]);

  const handleSetCount = () => {
    if (flag) {
      setCount((count) => {
        return { times: count.times + 1 };
      });
      flag = false;
    }

    if (!flag) {
      setCount((count) => {
        return { count: count.count + 1 };
      });
      flag = true;
    }
  };

  return (
    <div>
      <p>you clicked {count.times} times</p>
      <p>you clicked {count.count} times</p>
      <button type="button" onClick={handleSetCount}>
        click me
      </button>
    </div>
  );
};

export default effectHook;
