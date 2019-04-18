import React from "react";

import CountDown from "./../../components/CountDown/countDownWithHook.jsx";
// import CountDown from "./../../components/CountDown/countDownWithClass.jsx";

import HomeWrapper from "./home.css.js";

// const useTimer = (initialTime) => {
//   const [time, setTimer] = React.useState(initialTime);
//   const handleSetTimer = (newTime) => setTimer(newTime);

//   return { time, handleSetTimer };
// };

const initialTime = 5000;

// const Home = () => {
//   const { time, handleSetTimer } = useTimer(0);

//   const handleLessThenZero = () => {
//     console.error("less then 0");

//     // TODO 时间小于等于 0，重置为 initialTime
//     handleSetTimer(5000);
//   };

//   return (
//     <HomeWrapper>
//       <button type="button" onClick={() => handleSetTimer(initialTime)}>
//         Set Timer
//       </button>
//       <CountDown remainingTime={time} onLessThenZero={handleLessThenZero} />
//     </HomeWrapper>
//   );
// };

class Home extends React.Component {
  state = {
    time: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: Number(new Date()) + 1000 });
    }, 10000);
  }

  handleSetTimer = (newTime) => {
    this.setState({ time: newTime });
  };

  handleLessThenZero = () => {
    console.log("zero");
    this.handleSetTimer(0);
  }

  render() {
    const { time } = this.state;

    return (
      <HomeWrapper>
        <button type="button" onClick={() => this.handleSetTimer(initialTime)}>
          Set Timer
        </button>
        <CountDown remainingTime={time} onLessThenZero={this.handleLessThenZero} />
      </HomeWrapper>
    );
  }
}

export default Home;
