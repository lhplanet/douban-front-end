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

  // 通过人物id获取最近电影
  getRecentMovieByPersonId: (id: string) => {
    return request.get("/movie/getRecentMovieByPersonId", {
      params: {
        id,
      },
    });
  },

  // 通过人物id获取评分最高电影
  getBestMovieByPersonId: (id: string) => {
    return request.get("/movie/getBestMovieByPersonId", {
      params: {
        id,
      },
    });
  },
};

export default personAPI;
