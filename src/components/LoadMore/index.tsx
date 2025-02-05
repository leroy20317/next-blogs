/*
 * @Author: leroy
 * @Date: 2021-12-26 16:46:27
 * @LastEditTime: 2025-02-05 11:08:44
 * @Description: LoadMore
 */

import { times } from 'lodash-es';
import styles from './index.module.scss';
import classNames from 'classnames';
import type { FC } from 'react';

const LoadMore: FC<{ status: API.LoadingStatus }> = ({ status }) => {
  return (
    <div
      className={classNames({
        'bottom-loading': true,
        [styles['bottom-loading']]: true,
      })}
    >
      {status === 'loading' ? (
        <div className={styles.loader}>
          {times(5, String).map((item) => (
            <div className={styles.dot} key={item} />
          ))}
        </div>
      ) : status === 'nomore' ? (
        <div
          className={classNames({
            btn: true,
            [styles.btn]: true,
          })}
        >
          呜呜，没有更多了~~
        </div>
      ) : (
        <div
          className={classNames({
            btn: true,
            [styles.btn]: true,
            [styles.more]: true,
          })}
        >
          加载更多
        </div>
      )}
    </div>
  );
};
export default LoadMore;
