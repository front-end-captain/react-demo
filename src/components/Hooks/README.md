
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

在调用 useEffect 后，相当于告诉 React 在每一次组件更新完成渲染后，都调用传入 useEffect 中的函数，包括初次渲染以及后续的每一次更新渲染。

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

### Context Hook

### Custom Hook

### Other Hook

### Rules of Hook
1. 在顶部使用 hook，不要使用 hook 在条件判断，循环，嵌套函数。
2. 只在 function component 中使用 hook，或者自定义 hook 中使用 hook, 不要在常规的 JavaScript 函数中使用 hook

### 分类
#### DOM 修改
比如修改文档 title, 修改 DOM 节点属性。内容

#### 监听
用户代理网络变化，窗口大小变化，jian'ting

#### 表单


**链接**

[making-sense-of-react-hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
[rehooks](https://rehooks.com)
[awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
