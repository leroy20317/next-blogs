const Url = {
  staticHost: process.env.STATIC_HOST,
  wwwDomain: process.env.API_HOST?.replace('api', 'www'),
  info: '/info', // 页面相关信息
  article: '/article', // 文章
  envelope: '/envelope', // 短语
  about: '/about', // 关于我
  comment: '/comment', // 评论
  article_like: '/article/like', // 点赞
};
export default Url;
