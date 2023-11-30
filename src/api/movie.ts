import request from "@/utils/request"; // 引入封装的 axios 实例

const movieAPI = {
  // 通过id获取电影
  getMovieById: (id: number) => {
    return request.get("/movie/getMovieById", {
      params: {
        id,
      },
    });
  },

  // 查找所有电影
  getAllMovies: () => {
    return request.get("/movie/getAllMovies");
  },

  // 查找评分前10的电影
  getTop10Movies: () => {
    return request.get("/movie/getTop10Movies");
  },

  // 通过用户输入的关键字查找电影
  getMoviesByKeyword: (keyword: string) => {
    return request.get("/movie/getMoviesByKeyword", {
      params: {
        keyword,
      },
    });
  },

  // 查找Top250的电影
  getTop250Movies: () => {
    return request.get("/movie/getTop250Movies");
  },
};

export default movieAPI;
