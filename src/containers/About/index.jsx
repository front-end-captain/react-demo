import React from "react";

import StandardTable from "./standardTable.jsx";

import { fetchTopicList } from "./api.js";

const About = () => {
  const topicColumns = [
    {
      title: "作者",
      dataIndex: "author",
      render: (record) => {
        return record.loginname;
      },
    },
    {
      title: "类型",
      dataIndex: "tab",
    },
    {
      title: "题目",
      dataIndex: "title",
    },
    {
      title: "访问数",
      dataIndex: "visit_count",
    },
  ];

  return (
    <div>
      <StandardTable columns={topicColumns} fetchCallback={fetchTopicList} />
    </div>
  );
};

export default About;
