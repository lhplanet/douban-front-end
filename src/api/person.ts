import request from "@/utils/request"; // 引入封装的 axios 实例

const personAPI = {
  // 通过id获取人物
  getPersonById: (id: number) => {
    return request.get("/person/getPersonById", {
      params: {
        id,
      },
    });
  },

  // 通过电影id获取人物
  getPersonsByMovieId: (id: number) => {
    return request.get("/person/getPersonsByMovieId", {
      params: {
        id,
      },
    });
  },
};

export default personAPI;
