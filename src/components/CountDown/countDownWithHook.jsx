import React, { useState, useEffect, useRef, memo } from "react";
import { parseRemainingMillisecond, STEP, INTERVAL } from "./utils.js";

const useInterval = (callback, delay) => {
  const saveCallback = useRef();
  let timer;

  useEffect(() => {
    saveCallback.current = callback;
  });

  useEffect(() => {
    timer = setInterval(() => {
      saveCallback.current();
    }, delay);

    return () => clearInterval(timer);
  }, []);
};

// 接收一个时间戳(毫秒), 这个时间戳可能立即被传入，也有可能被稍后传入，比如从服务端获取，这个时间戳将会在每隔 20s 更新一次
// 时间走到 0，调用外部回调函数，这个回调函可能会设置一个新的时间戳然后传入
// 传入的剩余时间变更了，即 props 变了
// 上一次传入的剩余时间和下一次传入的剩余时间相等 或者传入的剩余时间为 0，即跳过某些渲染

/**
 * 传入一个时间戳，返回一个每隔 INTERVAL 时间，递减 STEP 的时间戳，并在时间戳小于等于 0 时，调用回调函数
 *
 * @param remainingTime
 * @param callback
 * @returns {{ countdown: number }}
 */
const useCountDown = (remainingTime, callback) => {
  const [countdown, setCountDown] = useState(remainingTime);

  useInterval(() => {
    setCountDown(Math.abs(countdown) - STEP);
  }, INTERVAL);

  // useEffect(() => {
  //   setCountDown(remainingTime);

  //   useInterval(() => {
  //     setCountDown(Math.abs(countdown) - STEP);
  //   }, INTERVAL);
  // }, [remainingTime]);

  if (countdown <= 0) {
    callback();
  }

  return { countdown };
};

const CountDown = memo(({ remainingTime, onLessThenZero }) => {
  if (remainingTime === 0) {
    return <strong>{parseRemainingMillisecond(0)}</strong>;
  }

  const { countdown } = useCountDown(remainingTime, onLessThenZero);

  return <strong>{parseRemainingMillisecond(countdown)}</strong>;
});

CountDown.defaultProps = {
  remainingTime: 0,
};

export default CountDown;
