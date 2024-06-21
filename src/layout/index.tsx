/**
 * @author: leroy
 * @date: 2021/10/29 17:47
 * @description：Layout
 */

import Head from 'next/head';
import Header from '@/components/Header';
import SEO from './SEO';
import Footer from './Footer';
import type { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode; hideHeader?: boolean; hideFooter?: boolean }> = ({
  children,
  hideHeader,
  hideFooter,
}) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="Author" content="Leroy" />
      <meta name="baidu-site-verification" content="uGgzMZ4ZfV" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta httpEquiv="cleartype" content="on" />
      <meta name="HandheldFriENDly" content="True" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="yes" name="apple-touch-fullscreen" />
      <link rel="icon" type="image/x-icon" href="/icon.ico" />
    </Head>
    <main>
      {!hideHeader && <Header />}
      {children}
    </main>
    <SEO />
    {!hideFooter && <Footer />}
  </>
);
export default Layout;
