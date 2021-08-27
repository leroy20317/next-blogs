/**
 * @author: leroy
 * @date: 2021/8/21 09:54
 * @description：page
 */
import type { NextPage } from 'next';
import Link from 'next/link';
import { ConfigProvider, DatePicker } from 'antd';
import styles from '@/styles/pages/home.module.scss';

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import wrapper, { useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { incrementAsync } from '@/store/slices/userSlice';

const Page: NextPage = (props) => {
  const counter = useAppSelector((state) => state.counter);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log('counter, user', { counter, user }, props);
  }, []);
  return (
    <div className={styles.box}>
      Page
      <ConfigProvider locale={locale}>
        <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
      </ConfigProvider>
      <span className="iconfont icon-close"></span>
      <Link href="/">
        <a>go to home</a>
      </Link>
      <p>{JSON.stringify({ counter, user })}</p>
    </div>
  );
};

Page.getInitialProps = wrapper.getInitialPageProps((store) => async ({ req }) => {
  if (req) {
    console.log('------Page 服务端------');
    await store.dispatch(incrementAsync(1));
  }
  return {};
});

export default Page;
