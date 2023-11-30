import axios from 'axios';

const baseURL = 'http://localhost:8080'; // 后端接口地址

const request = axios.create({
  baseURL,
  timeout: 5000, // 请求超时时间
  // withCredentials: true, // 开启跨域携带凭证
});

// 添加响应拦截器
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error("Error response status: " + error.response.status);
      console.error("Error response data: " + JSON.stringify(error.response.data));
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error("No response received: " + error.request);
    } else {
      // 请求设置时发生错误
      console.error("Request error: " + error.message);
    }
    return Promise.reject(error);
  }
);

export default request;