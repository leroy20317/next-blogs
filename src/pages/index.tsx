/**
 * @author: leroy
 * @date: 2021/8/21 09:54
 * @description：首页
 */
import type { NextPage } from 'next';
import Link from 'next/link';
import { ConfigProvider, DatePicker } from 'antd';
import styles from '@/styles/pages/home.module.scss';

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import wrapper, { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { incrementIfOdd } from '@/store/slices/userSlice';
import { incrementAsync } from '@/store/slices/counterSlice';

const Home: NextPage = (props) => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log('counter, user', { counter, user }, props);
  }, []);
  return (
    <div className={styles.box}>
      首页
      <ConfigProvider locale={locale}>
        <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
      </ConfigProvider>
      <span className="iconfont icon-close" />
      <Link href="/page">
        <a>go to page</a>
      </Link>
      <button onClick={() => dispatch(incrementIfOdd(22))}>+++</button>
      <button onClick={() => dispatch(incrementAsync(211))}>incrementAsync</button>
    </div>
  );
};

Home.getInitialProps = wrapper.getInitialPageProps((store) => async ({ req }) => {
  if (req) {
    console.log('------Home 服务端------');
    await store.dispatch(incrementAsync(33));
    // res?.setHeader('Set-Cookie', [`aa=11; path=/;`]);
    // res?.writeHead(302, {Location: '/page'}).end()
  }
  return {};
});

export default Home;
