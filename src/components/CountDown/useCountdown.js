/* eslint-disable no-extra-boolean-cast */
import { useState, useEffect, useRef } from "react";

/**
 *
 * @param {number} remainSeconds 剩余秒数
 * @param {boolean} startRunning 是否立即开始
 */
export default function useCountdown(remainSeconds, startRunning = true) {
  if (!Number.isSafeInteger(remainSeconds)) throw Error("Value provided isn't valid.");

  const remainMilliseconds = Math.abs(remainSeconds) * 1000;

  const [countdown, setCountdown] = useState(remainMilliseconds);
  const [running, setRunning] = useState(!!startRunning);
  const countdownTimer = useRef();
  const cleanerTimer = useRef();

  function stopCountdown() {
    setRunning(false);
    clearInterval(countdownTimer.current);
    clearTimeout(cleanerTimer.current);
  }

  function tick() {
    setCountdown((prevTime) => prevTime - 1000);
  }

  function startCountdown() {
    setCountdown(remainMilliseconds);
    setRunning(true);
    countdownTimer.current = setInterval(tick, 1000);
    cleanerTimer.current = setTimeout(stopCountdown, remainMilliseconds + 1000);
  }

  useEffect(() => {
    if (!!startRunning) startCountdown();
    return stopCountdown;
  }, [remainSeconds]);

  function resumeCountdown() {
    setRunning(true);
    countdownTimer.current = setInterval(tick, 1000);
    cleanerTimer.current = setTimeout(stopCountdown, countdown * 1000);
  }

  function resetCountdown() {
    stopCountdown();
    startCountdown();
  }

  return {
    countdown,
    running,
    startCountdown,
    stopCountdown,
    resumeCountdown,
    resetCountdown,
  };
}
