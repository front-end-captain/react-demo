/**
 * 讲一个毫秒时间戳转化为 hh:mm:ss 的形式
 *
 * @param millisecond
 * @returns {string}
 */
const parseRemainingMillisecond = (millisecond) => {
  const millisecondABS = Math.abs(millisecond);
  const millisecondOfHour = 60 * 60 * 1000;
  const millisecondOfMinute = 60 * 1000;
  const millisecondOfSecond = 1000;
  let hours = Math.floor(millisecondABS / millisecondOfHour);
  let minutes = Math.floor((millisecondABS - hours * millisecondOfHour) / millisecondOfMinute);
  let seconds = Math.floor(
    (millisecondABS - hours * millisecondOfHour - minutes * millisecondOfMinute) /
      millisecondOfSecond,
  );

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const STEP = 1000;
const INTERVAL = 1000;

export { parseRemainingMillisecond, STEP, INTERVAL };
