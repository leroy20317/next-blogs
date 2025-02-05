/**
 * @author: leroy
 * @date: 2021/8/20 20:30
 * @description：_app
 */
import type { ReactElement, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { wrapper } from '@/store/store';

import 'antd/dist/reset.css';
import '@/styles/global.scss';
import '@/styles/var.scss';
import '@/styles/iconfont.scss';
import type { NextPage } from 'next';
import Layout from '@/layout';
import Loading from '@/components/Loading';

import { ConfigProvider } from 'antd';
import { getInfo } from '@/store/slices/common';
import App from 'next/app';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic';

const CreatePortal = dynamic(() => import('@/components/CreatePortal'), { ssr: false });

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  err: any;
};

function MyApp({ Component, pageProps, ...other }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore({ pageProps, ...other });

  const router = useRouter();
  const [pageLoading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      setLoading(true);
    };
    const handleStop = () => {
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

  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorInfo: '#24292e',
            colorPrimary: '#0084ff',
            colorError: '#ff3600',
          },
        }}
      >
        {getLayout(
          <>
            <CreatePortal>
              <Loading loading={pageLoading} />
            </CreatePortal>
            <Component {...props.pageProps} {...other} pageLoading={pageLoading} />
          </>,
        )}
      </ConfigProvider>
    </Provider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
  const {
    ctx: { req },
  } = appContext;
  if (req) {
    try {
      await store.dispatch(getInfo());
    } catch (e) {
      console.log('e', e);
    }
  }
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
});

export function reportWebVitals(metric: NextWebVitalsMetric) {
  return;
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

export default MyApp;
