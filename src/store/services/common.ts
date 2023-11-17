/**
 * @author: leroy
 * @date: 2021/8/23 16:11
 * @description：common
 */
import Url from '@/utils/url';
import api from '@/utils/api';

// 用户信息
export async function fetchInfo(): Promise<API.Response<API.Info>> {
  return api(Url.info, {
    method: 'GET',
  });
}

// 首页文章列表
export async function fetchArticles(params: {
  page: number;
}): Promise<API.Response<API.Article.List>> {
  return api(Url.article, {
    method: 'GET',
    params,
  });
}

// 文章列表页
export async function fetchMoods(params: {
  page: number;
  mood: 1;
}): Promise<API.Response<API.Article.Mood>> {
  return api(Url.article, {
    method: 'GET',
    params,
  });
}

// 文章详情页
export async function fetchMoodDetail(params: {
  id: string;
}): Promise<API.Response<API.Article.Detail>> {
  return api(`${Url.article}/${params.id}`, {
    method: 'GET',
    params,
  });
}

// 点赞
export async function articleLike(likeId?: string): Promise<API.Response> {
  return api(`${Url.article_like}/${likeId}`, {
    method: 'PUT',
  });
}

// 一句话列表页
export async function fetchEnvelopes(params: {
  page: number;
}): Promise<API.Response<API.Envelope.List>> {
  return api(Url.envelope, {
    method: 'GET',
    params,
  });
}

// 关于我页
export async function fetchAbout(): Promise<API.Response<API.About>> {
  return api(Url.about, {
    method: 'GET',
  });
}
