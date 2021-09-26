/**
 * @author: leroy
 * @date: 2021/8/20 20:30
 * @description：_app
 */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import ErrorPage from '@/layout/Error';
import LoadingPage from '@/layout/Loading';
import wrapper from '@/store/store';

import 'antd/dist/antd.css';
import '@/styles/global.scss';
import '@/styles/var.scss';
import '@/styles/iconfont.scss';
import { getInfo } from '@/store/slices/commonSlice';
import { clearPending } from '@/utils/api';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  if ([404, 500].includes(pageProps.statusCode)) {
    return <ErrorPage statusCode={pageProps.statusCode} />;
  }

  return (
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
      </Head>
      <LoadingPage isMobile={pageProps.isMobile} loading={loading} />
      <Component {...pageProps} />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
  let userAgent;
  if (ctx?.req) {
    console.log('------服务端------');
    await store.dispatch(getInfo());
    userAgent = ctx.req.headers['user-agent'];
  } else {
    userAgent = navigator.userAgent;
  }
  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}),
      isMobile: /Mobile/gi.test(userAgent),
    },
  };
});

export default wrapper.withRedux(MyApp);
