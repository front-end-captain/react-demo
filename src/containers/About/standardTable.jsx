import React from "react";
import { Table } from "antd";

import useTable from "./useTable.js";

/**
 * 基础功能
 * 1. 数据展示
 * 2. 查询表单(一个或者多个查询输入框, 下拉选择框)
 * 3. 操作组(新建, 批量删除, 其他)
 * 4. 行选择框(rowSelection)
 */

const StandTable = ({ columns, fetchCallback }) => {
  const { data, loading, handlePaginationChange, currentPage, size } = useTable(
    fetchCallback,
  );

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.id}
      pagination={{
        total: 100,
        showSizeChanger: false,
        current: currentPage,
        pageSize: size,
        onChange: handlePaginationChange,
      }}
    />
  );
};

export default StandTable;
