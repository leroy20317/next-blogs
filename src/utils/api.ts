import axios from 'axios';

declare module 'axios' {
  export interface AxiosResponse <T = any> extends Promise<T> { }
}

const instance = axios.create({
  baseURL:
    typeof window === 'undefined'
      ? process?.env?.API_HOST?.replace('https', 'http')
      : process.env.API_HOST,
  timeout: 5000,
  headers: {
    ...(typeof window === 'undefined' && { Connection: 'keep-alive' }),
  },
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  // 转变数据格式
  if (config?.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.transformRequest = (data) => {
      const str = Object.keys(data).map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
      );
      return str.join('&');
    };
  }
  return config;
});
// 响应拦截器即异常处理
instance.interceptors.response.use((res) => {
  return res.data;
});

export default instance;
