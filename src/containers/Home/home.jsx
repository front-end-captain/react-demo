import React, { useState } from "react";

// import CountDown from "./../../components/CountDown/countDownWithHook.jsx";
import CountDown from "./../../components/CountDown/countDownWithClass.jsx";

import HomeWrapper from "./home.css.js";

const useTimer = (initialTime) => {
  const [time, setTimer] = useState(initialTime);
  const handleSetTimer = (newTime) => setTimer(newTime);

  return { time, handleSetTimer };
};

const initialTime = 5000;


const Home = () => {
  const { time, handleSetTimer } = useTimer(0);

  const handleLessThenZero = () => {
    console.error("less then 0");
    handleSetTimer(initialTime);
  };

  return (
    <HomeWrapper>
      <button type="button" onClick={() => handleSetTimer(initialTime)}>
        Set Timer
      </button>
      <CountDown remainingTime={time} onLessThenZero={handleLessThenZero} />
    </HomeWrapper>
  );
};

export default Home;
