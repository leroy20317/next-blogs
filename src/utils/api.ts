/**
 * @author: leroy
 * @date: 2021/9/26 16:35
 * @description：request
 */

import { extend } from 'umi-request';
import { notification } from 'antd';
import qs from 'qs';
import { checkServer } from '@/utils/util';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const isServer = checkServer();

const key = 'error';

const request = extend({
  prefix: isServer ? process?.env?.API_HOST?.replace('https', 'http') : process.env.API_HOST,
  timeout: 5000,
  headers: {
    ...(typeof window === 'undefined' && { Connection: 'keep-alive' }),
  },
  errorHandler: (error) => {
    const { response } = error;
    if (typeof window !== 'undefined' && response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, url } = response;
      if (status === 401 || status === 403) {
        notification.error({
          key,
          message: '未登录或登录已过期，请重新登录。',
        });
      }
      notification.error({
        key,
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }

    if (!response && typeof window !== 'undefined') {
      notification.error({
        key,
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }

    throw error;
  },
});

const pending = new Map();

const createPadding = (token: string) => {
  const controller = new AbortController(); // 创建一个控制器
  const { signal, abort } = controller; // 返回一个 AbortSignal 对象实例，它可以用来 with/abort 一个 DOM 请求。
  // signal.addEventListener('abort', () => {
  //   console.log('aborted!');
  // });
  pending.set(token, { signal, abort });
};

const deletePending = (token: string) => {
  try {
    pending.get(token)?.abort?.();
  } catch (e) {}
  pending.delete(token);
};

// 清空 pending 中的请求（在路由跳转时调用）
export const clearPending = () => {
  if (typeof window === 'undefined') return;
  try {
    pending.forEach((controller) => {
      controller?.abort?.();
    });
  } catch (e) {}
  pending.clear();
};

// 请求拦截器
request.interceptors.request.use((url, options) => {
  if (typeof window !== 'undefined') {
    // 发起请求时，取消掉当前正在进行的相同请求
    const token = [
      options.method,
      url,
      qs.stringify(options.params),
      qs.stringify(options.data),
    ].join('&');
    // 如果在 pending 中存在当前请求标识，则取消并移除当前请求，否则添加
    (pending.has(token) ? deletePending : createPadding)(token);

    return {
      options: {
        ...options,
        signal: pending.get(token)?.signal,
      },
    };
  }
  return { options };
});

// 响应拦截器即异常处理
request.interceptors.response.use((response, options) => {
  if (typeof window !== 'undefined') {
    const token = [
      options.method,
      options.url,
      qs.stringify(options.params),
      qs.stringify(options.data),
    ].join('&');
    deletePending(token);
  }
  return response;
});

export default request;
