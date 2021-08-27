/**
 * @author: leroy
 * @date: 2021/8/20 20:30
 * @description：_app
 */
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '@/styles/global.scss';
import '@/styles/var.scss';
import '@/styles/iconfont.scss';
import ErrorPage from 'next/error';

import wrapper from '@/store/store';
import { save } from '@/store/slices/userSlice';

function MyApp({ Component, pageProps }: AppProps) {
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
