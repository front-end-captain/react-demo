import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url, initValue, options = {}) => {
  const [data, saveData] = useState(null);
  const [loading, updateLoading] = useState(true);
  const [error, updateError] = useState({ error: null, message: "" });

  let ignore = false;

  const fetchData = async () => {
    updateLoading(true);

    const response = await axios(url, options);

    if (!ignore) saveData(response.data);

    updateLoading(false);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      updateError({ error: true, message: error.message });
    }

    return () => (ignore = true);
  }, [initValue]);

  return { data, loading, error };
};

export default useFetchData;
