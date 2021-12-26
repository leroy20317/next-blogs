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

// 文章列表
export async function fetchArticles(params: { page: number }) {
  return api<API.Response<API.Article.List>>(Url.article, {
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
