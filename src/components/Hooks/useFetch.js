import { useReducer, useEffect } from "react";

const FETCHING = "fetching";
const SAVE_DATA = "save_data";
const SAVE_ERROR = "save_error";

const fetchDataState = {
  loading: false,
  data: {},
  error: null,
};

const fetchDataReducer = (state = fetchDataState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        loading: action.loading,
      };
    case SAVE_DATA:
      return {
        ...state,
        data: action.data,
      };
    case SAVE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

const useFetch = (fetchCallback, params = {}) => {
  const [state, dispatch] = useReducer(fetchDataReducer, fetchDataState);

  const fetchData = async () => {
    // clear error info before each request
    dispatch({ type: SAVE_ERROR, error: null });
    dispatch({ type: FETCHING, loading: true });

    let response = null;

    try {
      response = await fetchCallback(params);

      if (response.status === 200 && response.data.success) {
        dispatch({ type: SAVE_DATA, data: response.data });
      } else {
        throw new Error(
          `the data fetched failure, the reason maybe ${response.data.message || "unknown"}`,
        );
      }
    } catch (error) {
      dispatch({ type: SAVE_ERROR, error });
    } finally {
      dispatch({ type: FETCHING, loading: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, [...Object.values(params)]);

  return state;
};

export { useFetch };
