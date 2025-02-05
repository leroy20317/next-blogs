/*
 * @Author: leroy
 * @Date: 2021-11-07 16:55:19
 * @LastEditTime: 2025-02-05 11:36:41
 * @Description:  url
 */
const Url = {
  staticHost: process.env.STATIC_HOST,
  wwwDomain: `https://www${process.env.BASE_DOMAIN}`,
  info: '/info', // 页面相关信息
  article: '/article', // 文章
  envelope: '/envelope', // 短语
  about: '/about', // 关于我
  comment: '/comment', // 评论
  article_like: '/article/like', // 点赞
};
export default Url;
