/**
 * @author: leroy
 * @date: 2021/8/20 20:30
 * @description：_app
 */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import ErrorPage from 'next/error';
import wrapper from '@/store/store';
import { save } from '@/store/slices/userSlice';
import { clearPending } from '@/utils/api';

import 'antd/dist/antd.css';
import '@/styles/global.scss';
import '@/styles/var.scss';
import '@/styles/iconfont.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
    };
    const handleStop = () => {
      clearPending();
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

  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
  if (ctx.req) {
    console.log('------服务端------');
    await store.dispatch(save('2111'));
  }
  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}),
    },
  };
});

export default wrapper.withRedux(MyApp);
