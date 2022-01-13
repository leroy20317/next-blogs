/**
 * @author: leroy
 * @date: 2022-01-13 15:46
 * @description：rain
 */

import styles from '@/styles/pages/rain.module.scss';
import Link from 'next/link';
import Url from '@/utils/url';
import { useEffect, useRef, useState } from 'react';
import Layout from '@/layout';
import classNames from 'classnames';
import { Progress } from 'antd';
import { saveTDK } from '@/store/slices/seo';

const Rain = () => {
  const [icons, setIcons] = useState([
    {
      on: '/image/rain/rain_on.png',
      off: '/image/rain/rain_off.png',
      music: '/image/rain/thunder.mp3',
      active: false,
    },
    {
      on: '/image/rain/rain2_on.png',
      off: '/image/rain/rain2_off.png',
      music: '/image/rain/loudThunder.mp3',
      active: false,
    },
    {
      on: '/image/rain/rain3_on.png',
      off: '/image/rain/rain3_off.png',
      music: '/image/rain/rain.mp3',
      active: false,
    },
  ]);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const musics = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    const url = `${Url.staticHost}/image/rain/rain-bg.gif`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onprogress = (res) => {
      setProgress(res.lengthComputable ? res.loaded / res.total : 0.99);
    };
    xhr.onreadystatechange = ({ currentTarget }: { currentTarget: any }) => {
      if (currentTarget && currentTarget.status === 200 && currentTarget.readyState === 4) {
        setTimeout(() => {
          setLoading(false);
          setSrc(url);
        }, 100);
      }
    };
  }, []);

  const onMusic = (index: number, active: boolean) => {
    const newIcons = [...icons];
    newIcons[index].active = !active;
    setIcons(newIcons);
    if (!active) {
      musics.current[index].play();
    } else {
      musics.current[index].pause();
    }
  };
  return (
    <div className={styles.rain} style={{ backgroundImage: src ? `url(${src})` : undefined }}>
      <Link href="/">
        <div className={styles['logo-img']}>Leroy</div>
      </Link>

      <img
        className={styles.words}
        src={`${Url.staticHost}/image/rain/words.png`}
        draggable="false"
      />
      <ul className={styles.option}>
        {icons.map((icon, index) => (
          <li key={index}>
            <span onClick={() => onMusic(index, icon.active)}>
              <img
                src={icon.active ? `${Url.staticHost}${icon.on}` : `${Url.staticHost}${icon.off}`}
                draggable="false"
              />
            </span>
            <audio
              ref={(ref) => {
                if (ref) musics.current[index] = ref;
              }}
              className={styles.music}
              loop
              autoPlay
            >
              <source type="audio/mpeg" src={`${Url.staticHost}${icon.music}`} />
            </audio>
          </li>
        ))}
      </ul>
      <div
        className={classNames({
          [styles.progress]: true,
          [styles.hide]: !loading,
        })}
      >
        <div className={styles.bar}>
          <Progress percent={progress * 100} status="active" showInfo={false} />
        </div>

        <div className={styles.text}>
          <span>Loading</span>
          <span>{(progress * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};
Rain.getLayout = (page) => (
  <Layout hideHeader hideFooter>
    {page}
  </Layout>
);
Rain.getInitialProps = async ({ store }) => {
  await store.dispatch(
    saveTDK({
      title: `Rainy Day`,
      description:
        '下雨了，打湿心扉的，不是突如其来的雨点，是人情冷暖。一辆黑色的轿车，嘎然而止，一声亲切的呼唤，上车吧！',
    }),
  );
  return { title: `Rainy Day` };
};
export default Rain;
