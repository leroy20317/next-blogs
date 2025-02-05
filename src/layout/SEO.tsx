/*
 * @Author: leroy
 * @Date: 2023-11-17 10:55:01
 * @LastEditTime: 2025-02-05 11:42:19
 * @Description: SEO
 */
import { useAppSelector } from '@/store/store';
import type { FC } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import url from '@/utils/url';
const siteName = "Leroy's Blogs";
const SEO: FC = () => {
  const { title, description, keywords, openGraph } = useAppSelector((state) => state.seo);
  const { asPath } = useRouter();
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        type: 'website',
        locale: 'zh_CN',
        url: `${url.wwwDomain}${decodeURIComponent(asPath)}`,
        siteName: siteName,
        images: [
          {
            url: `${url.wwwDomain}/icon.png`,
            alt: siteName,
          },
        ],
        ...openGraph,
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: `${url.wwwDomain}/favicon.ico`,
        },
      ]}
      additionalMetaTags={[
        {
          name: 'application-name',
          content: siteName,
        },
        {
          name: 'keywords',
          content: keywords || '',
        },
        {
          httpEquiv: 'x-ua-compatible',
          content: 'IE=edge',
        },
        {
          name: 'viewport',
          content:
            'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
        },
        {
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
      ]}
    />
  );
};
export default SEO;
