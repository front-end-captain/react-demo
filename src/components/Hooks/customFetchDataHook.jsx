import { useState, useEffect } from "react";
import axios from "axios";

const SearchResult = () => {
  const [keyword, setKeyword] = useState("react");
  const [result, setResult] = useState({ hits: [] });
  const [loading, updateLoading] = useState(null);
  const [error, updateError] = useState({ error: null, message: "" });

  let ignore = false;

  const fetchResult = async (keyword) => {
    if (!keyword) {
      return;
    }

    updateLoading(true);

    const result = await axios(`https://hn.algolia.com/api/v1/search?query=${keyword}`);

    if (!ignore) setResult(result.data);
    updateLoading(false);
  };

  useEffect(() => {
    try {
      fetchResult();
    } catch (error) {
      updateError({ error: true, message: error.message });
    }

    return () => (ignore = true);
  }, [keyword]);

  const handleKeyword = (value) => {
    setKeyword(value);
  };

  return { data: result, loading, error, handleKeyword };
};

export default SearchResult;
