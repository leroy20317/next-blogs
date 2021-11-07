/**
 * @author: leroy
 * @date: 2021/8/20 20:30
 * @description：_app
 */
import type { ReactElement, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import wrapper from '@/store/store';

import 'antd/dist/antd.css';
import '@/styles/global.scss';
import '@/styles/var.scss';
import '@/styles/iconfont.scss';
import { clearPending } from '@/utils/api';
import type { NextPage } from 'next';
import Layout from '@/layout';
import Loading from '@/layout/Loading';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [pageLoading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      setLoading(true);
    };
    const handleStop = () => {
      clearPending();
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  // const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  // return getLayout(<Component {...pageProps} />)

  return (
    <Layout>
      <Loading loading={pageLoading} />
      <Component {...pageProps} pageLoading={pageLoading} />
    </Layout>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    // handle FCP results
    // TTFB + 内容加载时间 + 渲染时间
    case 'FCP':
      console.log('FCP 首次内容绘制', metric);
      break;
    // handle LCP results
    case 'LCP':
      console.log('LCP 最大的内容绘制', metric);
      break;
    // handle CLS results
    case 'CLS':
      console.log('CLS 累积布局偏移', metric);
      break;
    // handle FID results
    case 'FID':
      console.log('FID 首次输入延迟', metric);
      break;
    // handle TTFB results
    case 'TTFB':
      console.log('TTFB 首字节时间', metric);
      break;
    // handle route-change to render results
    case 'Next.js-route-change-to-render':
      console.log('路由改变后页面开始渲染的时间', metric);
      break;
    // handle render results
    case 'Next.js-render':
      console.log('路由更改后页面完成渲染的时间', metric);
      break;
    default:
      console.log(metric);
      break;
  }
}

export default wrapper.withRedux(MyApp);
