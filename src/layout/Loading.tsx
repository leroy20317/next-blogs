/**
 * @author: leroy
 * @date: 2021/8/28 15:03
 * @description：Loading
 */
import styles from '@/styles/layout/loading.module.scss';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { waitTime } from '@/utils/util';
import classNames from 'classnames';

const LoadingPage: NextPage<{ isMobile: boolean; loading: boolean; delay?: number }> = ({
  isMobile,
  loading,
  delay,
}) => {
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
      {isMobile ? (
        <div className={styles['spinner']}>
          <div className={styles['double-bounce1']}></div>
          <div className={styles['double-bounce2']}></div>
        </div>
      ) : (
        <div className={styles['cs-loader']}>
          <div className={styles['cs-loader-inner']}>
            <span>●</span>
            <span>●</span>
            <span>●</span>
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingPage;
