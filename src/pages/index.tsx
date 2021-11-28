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

const Home: NextPage = () => {
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
    </div>
  );
};

export default Home;
