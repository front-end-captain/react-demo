import axios from "axios";

const fetchTopicList = ({ currentPage = 1, pageSize = 10 }) => {;
  return axios.get(`https://cnodejs.org/api/v1/topics?page=${currentPage}&limit=${pageSize}`);
};

export { fetchTopicList };
