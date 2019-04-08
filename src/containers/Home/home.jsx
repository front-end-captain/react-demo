import React from "react";

// import TopActions from "./../../components/topActions/topActions.jsx";
// import Card from "./../../components/card/card.jsx";
// import ActionBar from "./../../components/actionBar/actionBar.jsx";
// import Tabs from "./../../components/tabs/tabs.jsx";

import StateHook from "../../components/Hooks/stateHook.jsx";
// import EffectHook from "./../../components/Hooks/effectHook.jsx";
import FetchData from "./../../components/Hooks/fetchData.jsx";
import Counter from "./../../components/Hooks/reducerHook.jsx";

import HomeWrapper from "./home.css.js";

const Home = () => {
  return (
    <HomeWrapper>
      {/* <TopActions />
      <Card />
      <ActionBar />
      <Tabs /> */}
      <StateHook />
      {/* <EffectHook /> */}
      <FetchData />
      <Counter initialCount={1} />
    </HomeWrapper>
  );
};

export default Home;
