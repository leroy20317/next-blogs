/**
 * @author: leroy
 * @date: 2021/8/27 18:21
 * @description：_error
 */
import { NextPage } from 'next';
import Url from '@/utils/url';
import { useEffect, useState } from 'react';
import useInterval from '@/hooks/useInterval';
import { useRouter } from 'next/router';
import styles from '@/styles/layout/error.module.scss';
import SEO from '@/layout/SEO';

const errTitle = {
  404: '404 | Sorry, the page you visited does not exist.',
  500: '500 | Sorry, something went wrong.',
};

const ErrorPage: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  const router = useRouter();
  const [number, setNumber] = useState(10);
  const [interval, setInterval] = useState<number | null>(null);
  const [on, setOn] = useState(true);

  const onClick = () => {
    if (on) {
      setOn(false);
      setInterval(null);
      return;
    }
    setOn(true);
    setInterval(1000);
  };

  useInterval(() => {
    if (number <= 0) {
      router.push('/');
    }
    setNumber(number - 1);
  }, interval);

  useEffect(() => {
    setInterval(1000);
  }, []);

  return (
    <div className={styles.container}>
      <SEO title={statusCode && errTitle[statusCode]} />
      <img src={`${Url.staticHost}/image/other/error.png`} />
      <div className={styles.content}>
        <ul>
          <li>世界上有什么不会失去的东西吗？我相信有，你也最好相信。</li>
          <li>世上有可以挽回的和不可挽回的事，而时间经过就是一种不可挽回的事。</li>
          <li>
            不必太纠结于当下，也不必太忧虑未来，当你经历过一些事情的时候，眼前的风景已经和从前不一样了。
          </li>
          <li>
            我的人生是我的，你的人生是你的。只要你清楚自己在寻求什么，那就尽管按自己的意愿去生活。别人怎么说与你无关。
          </li>
          <li>
            你要做一个不动声色的大人了。不准情绪化，不准偷偷想念，不准回头看。去过自己另外的生活。你要听话，不是所有的鱼都会生活在同一片海里。
          </li>
        </ul>
        <div>
          <span className={styles.red}>{number}</span>
          <span className={styles.pink}>s</span> 后，请给我一个重新开始的机会。
          <span className={styles.none} onClick={onClick}>
            ({on ? '点我暂停时间' : '时间开始'})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
