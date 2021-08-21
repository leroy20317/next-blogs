/**
 * @author: leroy
 * @date: 2021/8/21 09:54
 * @description：index
 */

import { ConfigProvider, DatePicker } from 'antd';
import styles from '@/styles/pages/home.module.scss';

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';

const Home = () => {
  return (
    <div className={styles.box}>
      首页
      <ConfigProvider locale={locale}>
        <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
      </ConfigProvider>
    </div>
  );
};
export default Home;
