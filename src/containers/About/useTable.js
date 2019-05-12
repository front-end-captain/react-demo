import { useState } from "react";

import useFetch from "./../../components/Hooks/useFetch.js";

const useTable = (fetchCallback) => {
  const defaultSize = 10;
  const defaultPage = 1;
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultSize);

  const { loading, data, error } = useFetch(fetchCallback, { currentPage, pageSize });

  const handlePaginationChange = (current, pageSize) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  const dataSource = data.data ? data.data : [];

  return { loading, error, data: dataSource, handlePaginationChange, currentPage, pageSize };
};

export { useTable };
