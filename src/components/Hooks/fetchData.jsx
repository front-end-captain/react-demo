import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetchData from "./useFetchDataEffect.js";

const SearchResult = () => {
  const [keyword, setKeyword] = useState("react");
  const [result, setResult] = useState({ hits: [] });
  const [loading, updateLoading] = useState(null);

  // useEffect 在每一次 render 完成后执行，包括首次 render，和后续的更新 render
  // 其第二个参数将作为这个 effect 的依赖，只有传入的值发生变化时，effect 才会执行，如果是引用类型会怎么样？
  // 当第二个参数为一个 空数组 时，相当于 componentDidMount 和 componentWillUnmount，表明这个 effect 没有任何依赖
  // 第一个参数的返回值，会在 组件卸载 时执行，相当于 componentWillUnmount，可以清理定时器，移除事件监听
  useEffect(() => {
    let ignore = false;

    const fetchResult = async () => {
      if (!keyword) {
        return;
      }

      updateLoading(true);

      const result = await axios(`https://hn.algolia.com/api/v1/search?query=${keyword}`);

      if (!ignore) setResult(result.data);
      updateLoading(false);
    };

    fetchResult();

    return () => (ignore = true);
  }, [keyword]);

  const setQuery = (event) => {
    const {
      target: { value: keyword },
    } = event;

    setKeyword(keyword);
  };

  return (
    <>
      <input value={keyword} onChange={setQuery} />
      {loading ? (
        <span>loading</span>
      ) : (
        <ul>
          {result.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const SimpleSearchResult = () => {
  const [keyword, setKeyword] = useState("react");

  const url = `https://hn.algolia.com/api/v1/search?query=${keyword}`;
  const { data, loading, error } = useFetchData(url, keyword);

  const setQuery = (event) => {
    const {
      target: { value: keyword },
    } = event;

    setKeyword(keyword);
  };

  if (error.error) {
    return <p>something wrong, {error.message}</p>;
  }

  return (
    <>
      <input value={keyword} onChange={setQuery} />
      {loading ? (
        <span>loading</span>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export { SearchResult, SimpleSearchResult };
