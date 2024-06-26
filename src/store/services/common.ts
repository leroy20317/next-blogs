/**
 * @author: leroy
 * @date: 2021/8/23 16:11
 * @description：common
 */
import Url from '@/utils/url';
import api from '@/utils/api';

// 用户信息
export async function fetchInfo() {
  return api<API.Response<API.Info>>(Url.info, {
    method: 'GET',
  });
}

// 首页文章列表
export async function fetchArticles(params: {
  page: number;
}) {
  return api<API.Response<API.Article.List>>(Url.article, {
    method: 'GET',
    params,
  });
}

// 文章列表页
export async function fetchMoods(params: {
  page: number;
  mood: 1;
}) {
  return api<API.Response<API.Article.Mood>>(Url.article, {
    method: 'GET',
    params,
  });
}

// 文章详情页
export async function fetchMoodDetail(params: {
  id: string;
}) {
  return api<API.Response<API.Article.Detail>>(`${Url.article}/${params.id}`, {
    method: 'GET',
    params,
  });
}

// 点赞
export async function articleLike(likeId?: string) {
  return api<API.Response>(`${Url.article_like}/${likeId}`, {
    method: 'PUT',
  });
}

// 一句话列表页
export async function fetchEnvelopes(params: {
  page: number;
}) {
  return api<API.Response<API.Envelope.List>>(Url.envelope, {
    method: 'GET',
    params,
  });
}

// 关于我页
export async function fetchAbout() {
  return api<API.Response<API.About>>(Url.about, {
    method: 'GET',
  });
}
