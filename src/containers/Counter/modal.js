import Store from "../../lib/store/index.js";
/* eslint-disable */

const counterStore = new Store({
  name: "counter",
  state: {
    count: 10,
    times: 100,
    visible: false,
  },
  reducers: {
    increment: (state, payload) => {
      if (payload) {
        state.count += payload;
        return;
      }

      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    addTimes: (state) => {
      state.times += 100;
    },
    toggleVisible: (state, payload) => {
      state.visible = payload;
    }
  },
  effects: {
    asyncIncrement: async (payload) => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      counterStore.dispatch((A) => A.increment, payload);
    },
  },
});

export default counterStore;
