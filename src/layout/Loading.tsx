/**
 * @author: leroy
 * @date: 2021/8/28 15:03
 * @description：Loading
 */
import styles from '@/styles/layout/loading.module.scss';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { waitTime } from '@/utils/util';
import classNames from 'classnames';

const LoadingPage: NextPage<{ loading: boolean; delay?: number }> = ({ loading, delay }) => {
  const [spinning, setSpinning] = useState(false);
  useEffect(() => {
    (async () => {
      if (!loading && delay) {
        await waitTime(delay);
        setSpinning(false);
      }
      setSpinning(loading);
    })();
  }, [loading]);

  return (
    <div
      className={classNames({
        [styles.preloader]: true,
        [styles.show]: spinning,
        [styles.hidden]: !spinning,
      })}
    >
      <div className={styles['spinner']}>
        <div className={styles['double-bounce1']} />
        <div className={styles['double-bounce2']} />
      </div>
      <div className={styles['pc-loader']}>
        <div className={styles['pc-loader-inner']}>
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
