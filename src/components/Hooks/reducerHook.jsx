import React, { useReducer } from "react";

const INCREMENT = "increment";
const DECREMENT = "decrement";

const initHandle = (initCount) => {
  return { count: initCount };
};

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    case "reset":
      return { count: action.payload };
    default:
      return state;
  }
};

const Counter = ({ initialCount }) => {
  const [state, dispatch] = useReducer(reducer, initialCount, initHandle);
  const { count } = state;

  return (
    <div>
      Counter: {count}
      <button type="button" onClick={() => dispatch({ type: "reset", payload: initialCount })}>
        Reset
      </button>
      <button type="button" onClick={() => dispatch({ type: INCREMENT })}>
        +
      </button>
      <button type="button" onClick={() => dispatch({ type: DECREMENT })}>
        -
      </button>
    </div>
  );
};

export default Counter;
