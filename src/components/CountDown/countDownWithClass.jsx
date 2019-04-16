import React, { Component } from "react";

// props: remainingTime: number 毫秒

class Countdown extends Component {
  /**
   * 将差异毫秒数转换为 hh:mm:ss 的形式
   *
   * @param {number} millisecond 毫秒数
   */
  static parseRemainingMillisecond(millisecond) {
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
  }

  constructor(props) {
    super(props);

    this.state = {
      countdown: "0",
    };

    this.STEP = 1000;
    this.INTERVAL = 1000;

    this.handleCountdown = this.handleCountdown.bind(this);
  }

  componentDidMount() {
    const { remainingTime } = this.props;
    if (remainingTime.toString.length > 0) {
      this.setState({ countdown: remainingTime });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { remainingTime } = this.props;
    if (nextProps.remainingTime !== remainingTime) {
      this.setState({ countdown: nextProps.remainingTime });
    }
  }

  shouldComponentUpdate(nextProps) {
    const { remainingTime } = this.props;
    return !(nextProps.remainingTime === remainingTime && remainingTime === 0);
  }

  componentDidUpdate() {
    const { countdown } = this.state;
    const { onLessThenZero } = this.props;
    clearInterval(this.countdownTimer);
    this.handleCountdown(countdown);

    if (countdown <= 0) {
      if (onLessThenZero) {
        onLessThenZero(countdown);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.countdownTimer);
  }

  handleCountdown(countdown) {
    this.countdownTimer = setInterval(() => {
      this.setState({ countdown: countdown === 0 ? 0 : Math.abs(countdown) - this.STEP });
    }, this.INTERVAL);
  }

  render() {
    const { countdown } = this.state;
    return <strong>{Countdown.parseRemainingMillisecond(countdown)}</strong>;
  }
}

export default Countdown;
