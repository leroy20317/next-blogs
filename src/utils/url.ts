let domain = process.env.API_HOST || '';
if (typeof window === 'undefined') {
  domain = domain.replace(/^https/i, 'http');
}

const Url = {
  staticHost: process.env.STATIC_HOST,
  domain,
  info: domain + '/info', // 页面相关信息
  article: domain + '/article', // 文章
  envelope: domain + '/envelope', // 短语
  about: domain + '/about', // 关于我
  comment: domain + '/comment', // 评论
  article_like: domain + '/article/like', // 点赞
};
export default Url;
