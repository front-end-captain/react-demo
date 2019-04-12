import React from "react";

// import TopActions from "./../../components/topActions/topActions.jsx";
// import Card from "./../../components/card/card.jsx";
// import ActionBar from "./../../components/actionBar/actionBar.jsx";
// import Tabs from "./../../components/tabs/tabs.jsx";

// import StateHook from "../../components/Hooks/stateHook.jsx";
// import EffectHook from "./../../components/Hooks/effectHook.jsx";
import { SimpleSearchResult } from "./../../components/Hooks/fetchData.jsx";
// import Counter from "./../../components/Hooks/reducerHook.jsx";

// import Collapse from "./../../components/toggle/normal/index.jsx";
// import Collapse from "./../../components/toggle/renderProps/index.jsx";
// import Collapse from "./../../components/toggle/hook/index.jsx";

import HomeWrapper from "./home.css.js";

// const { Panel } = Collapse;

const Home = () => {
  return (
    <HomeWrapper>
      {/* <TopActions /> */}
      {/* <Card /> */}
      {/* <ActionBar /> */}
      {/* <Tabs /> */}
      {/* <StateHook /> */}
      {/* <EffectHook /> */}
      {/* <FetchData /> */}
      <SimpleSearchResult />
      {/* <Counter initialCount={1} /> */}

      <Collapse>
        <Panel title="one">content one</Panel>
        <Panel title="two">content two</Panel>
        <Panel title="three">content three</Panel>
      </Collapse>
    </HomeWrapper>
  );
};

export default Home;
