/**
 * @author: leroy
 * @date: 2021/8/28 14:37
 * @description：seo
 */
import Head from 'next/head';
import { useAppSelector } from '@/store/store';
import type { FC } from 'react';

const SEO: FC = () => {
  const { title, description, keywords } = useAppSelector((state) => state.seo);
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://cdn.leroy.net.cn/images/icon.png" />
    </Head>
  );
};
export default SEO;
