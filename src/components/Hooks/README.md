
## Hooks
> 不通过编写类组件的情况下，可以在组件内部使用状态(state) 和其他 React 特性(生命周期，context)的技术

### 动机
#### 组件之间的状态逻辑很难复用
1. React 没有提供一种将可重用行为附加到组件的方式，比如去连接 store
2. 在之前的版本中通过 `render props` 或者 `hoc` 来解决这种问题吧，但是这两种模式对组件的侵入性太强。另外，会产生组件嵌套地狱的问题。
3. 通过 Hooks，可以抽取状态逻辑，使组件变得可测试，可重用。Hooks 允许你在不改变组件层次结构的情况下，去重用状态逻辑。更好的实现关注点分离。
**example** 使用组合，`render props`，hook 三种方式实现折叠面板

#### 复杂的组件变得越来越难以理解
1. 组件中充斥着无法管理的混乱的状态逻辑代码和各种副作用。各种不相关的逻辑代码出现在生命周期函数中。
2. 由于状态逻辑散落在各处，所以组件变得不可测试，同时也不好进行拆分。虽然可以引入状态管理的库，但是这样带来更多的抽象，需要在不同的文件之间跳转，组件复用变得很困难。

#### 类组件给开发者带来了很多困惑
1. this 问题，事件监听的添加和移除
2. 什么时候使用 function component, 什么时候使用 class component

### State Hook
> state hook 提供了一种可以在 function component 中添加状态的方式


``` javascript
import React, { useState } from "react";

const StateHook = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>you clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        click me
      </button>
    </div>
  );
};

```

`useState` 推荐一种更加细粒度的控制状态的方式，即一个状态对应一个状态设置函数，其接受的参数将作为这个状态的初始值。其返回一个长度为2的元组，第一项为当前状态，第二项为更新函数。

`useState` 的执行顺序在每一次更新渲染时必须保持一致，否则多个 useState 调用将不会得到各自独立的状态，也会造成状态对应混乱。
比如在条件判断中使用 hook，在循环，嵌套函数中使用 hook，都会造成 hook 执行顺序不一致的问题。最后导致状态的混乱。

##### `useState` 和 `setState` 的区别
> `useState` 将 `setState` 进行覆盖式更新，而 setState 则将状态进行合并式更新。

### Effect Hook
> 数据获取，设置订阅，手动的更改 DOM，都可以称为副作用，可以将副作用分为两种，一种是需要清理的，另外一种是不需要清理的。比如网络请求，DOM 更改，日志这些副作用都不要清理。而比如定时器，事件监听。

在调用 useEffect 后，相当于告诉 React 在每一次组件更新完成渲染后，都调用传入 `useEffect` 中的函数，包括初次渲染以及后续的每一次更新渲染。

##### Tips
1. 使用多个 effect 来实现关注点分离
2. 性能优化，跳过一些 effect 执行, 其第二个参数将作为这个 effect 的依赖，只有传入的值发生变化时，effect 才会执行，如果是引用类型会怎么样？
3. 第一个参数的返回值，会在 组件卸载 时执行，相当于 componentWillUnmount，可以清理定时器，移除事件监听
4. 当第二个参数为一个 空数组 时，相当于 componentDidMount 和 componentWillUnmount，表明这个 effect 没有任何依赖

``` javascript
import React, { useState, useEffect } from "react";

const effectHook = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `you clicked ${count} times`;
  });

  return (
    <div>
      <p>you clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        click me
      </button>
    </div>
  );
};
```

### question
1. 如何使用 `useEffect` 模拟 `componentDidMount` 生命周期？
  > `useEffect` 会捕获 `state` 和 `props`, 如果 `state` 或者 `props` 不是作为 effect 的依赖，那么每一次 effect 的回调函数拿到的 `state` 或者 `props` 总是初始值，或者使用 `useRef` 来保存最新的 `state` 和 `props`. **你需要 `think in effects`，思考如何实现状态同步，而不是去响应生命周期.**
2. 如何正确的在 `useEffect` 中去请求远端数据，其第二个参数 `[]` 是干什么的？
3. 可以把函数作为 `useEffect` 的依赖么？
4. 为什么会出现无限重复请求的情况?
  > 这个通常发生于你在 effect 里做数据请求并且没有设置 effect 依赖参数的情况。没有设置依赖，effect 会在每次渲染后执行一次，然后在 effect 中更新了状态引起渲染并再次触发 effect。无限循环的发生也可能是因为你设置的依赖总是会改变。你可以通过一个一个移除的方式排查出哪个依赖导致了问题。
5. 为什么有时候在 `useEffect` 中会拿到旧的的 `state` 和 `props`?
  > `useEffect` 总是捕获某一次特定渲染的 `state` 和 `props`。如果想拿到最新的值，可以使用 `useRef` 或者把 `state` 和 `props` 作为 `useEffect` 的依赖列表参数。

### gist
#### 每一次渲染都有自己的 `state` 和 `props`
``` jsx
function Counter() {
  const [count, setCount] = useState(0);

  // 事件处理函数属于某一次特定的 『渲染』在任意一次渲染中，props 和 state 都是保持不变的，且相互独立的，那么使用它们的任何值都是相互独立的，即使是在异步的情况下。它们都属于某一次特定的渲染。
  const handleAlertClick = () => {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```

#### 每一次渲染都有自己的 effect 函数(`useEffect`传入的回调函数称之为 effect 函数)
``` jsx
function Counter() {
  const [count, setCount] = useState(0);

  // 这里会依次输出每一次点击后的 count 值，而不是最新的 count 值
  // 比如在 3000ms 内连续点击了 5 次，会在 3000ms 后依次输出 count 值
  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

但是在 classComponent 中却又不同的行为
``` jsx
class Example extends Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }
  // 这里总是输出最新的 count 值，而不是每一次渲染的 count 值
  // 因为 this.state.count 总是指向最新的值，而不属于某一次特定的渲染
  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>
          Click me
        </button>
      </div>
    )
  }
}
```

也可以使用 `useEffect` 和 `useRef` 来实现 classComponent 的效果
``` jsx
function Counter() {
  const [count, setCount] = useState(0);

  // state 是不可更改的，而 ref 是可以更改的
  // 使用一个可以更改的对象来保存最新的状态值
  const latestCount = useRef(count);

  useEffect(() => {
    latestCount.current = count;
    setTimeout(() => {
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**结论**
> 组件内的函数(包括事件处理，effect，定时器， API调用)都会捕获定义它们时的 `state` 和 `props`;

#### 同步状态，而不是响应生命周期函数 Synchronization, no LifeCycle
> `useEffect` 允许你根据 `state` 和 `props` 来同步 react tree 之外的东西。react 会根据当前的 `state` 和 `props` 来同步的更新 DOM，mount 和 update 对于渲染并没有什么区别。

最后，`useEffect` 的设计意图就是强迫开发者去关注数据流的变更，然后决定我们的 effect 该如何与状态同步。

### Rules of Hook
1. 在顶部使用 hook，不要使用 hook 在条件判断，循环，嵌套函数。
2. 只在 function component 中使用 hook，或者自定义 hook 中使用 hook, 不要在常规的 JavaScript 函数中使用 hook

#### 缺点

1. 不能阻止更新，定制 `shouldComponentUpdate`， 即根据 state 的改变来决定是否需要更新
2. 错误边界捕获 使用 `try {} catch(){}` 没有 `componentDidCatch`
3. 一个组件若有状态，则状态一旦改变，所有的子组件需要重新渲染。所以一个有状态的组件，应该是没有子组件的。**有状态的组件不做渲染，有渲染的组件没有状态**
4. `getSnapshotBeforeUpdate` 不可以获取更新前 DOM 的快照。

**链接**

[making-sense-of-react-hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)

[rehooks](https://rehooks.com)

[awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)

[如何使用useEffect来获取数据](https://www.robinwieruch.de/react-hooks-fetch-data/)

[hooks 是如何工作的](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)
