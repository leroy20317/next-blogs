/**
 * @author: leroy
 * @date: 2021/8/28 14:37
 * @description：seo
 */
import Head from 'next/head';
import type { NextPage } from 'next';
import type { ReactNode } from 'react';

const SEO: NextPage<{
  title?: string;
  description?: string;
  keywords?: string;
  className?: string;
  children: ReactNode | ReactNode[];
}> = ({ title, description, keywords, className, children }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords || 'Leroy,Blog'} />
      <meta
        name="description"
        content={
          description ||
          'Good morning, and in case I don’t see you, good afternoon, good evening, and good night...'
        }
      />
      <meta
        property="og:description"
        content={
          description ||
          'Good morning, and in case I don’t see you, good afternoon, good evening, and good night...'
        }
      />
      <meta property="og:image" content="https://cdn.leroy.net.cn/images/icon.png" />
      <link rel="icon" type="image/x-icon" href="https://cdn.leroy.net.cn/images/icon.ico" />
    </Head>
    <main className={className}>{children}</main>
  </>
);
export default SEO;
