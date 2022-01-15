/**
 * @author: leroy
 * @date: 2021/8/28 14:37
 * @description：header
 */
import classNames from 'classnames';
import styles from './index.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Iconfont from '@/components/Iconfont';
import useScroll from '@/hooks/useScroll';
import { useAppSelector } from '@/store/store';
import Image from 'next/image';
import { message } from 'antd';
import useInterval from '@/hooks/useInterval';
import { articleLike } from '@/store/services/common';

let timer: NodeJS.Timer | null = null;

const Header = () => {
  const { info, header } = useAppSelector((state) => ({
    info: state.common.info,
    header: state.header,
  }));
  const router = useRouter();
  const [isLike, setIsLike] = useState(false);
  const [likeHint, setLikeHint] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playStatus, setPlayStatus] = useState<'play' | 'pause'>('play');
  const [dashArray] = useState<number>(Math.PI * 100);
  const dashOffset = useMemo(() => (1 - progress) * dashArray, [dashArray, progress]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { scroll_current } = useScroll();
  const toPage = (path: string) => {
    router.push(path);
  };

  // 切换播放状态
  const changeMusic = async () => {
    // 正在播放
    const isPlaying = playStatus === 'pause';

    if (isPlaying) {
      // 暂停
      audioRef.current?.pause();
      setPlayStatus('play');
      return;
    }

    if (!audioRef.current?.ondurationchange) {
      // 第一次播放音乐
      audioRef.current?.load();
    }

    try {
      await audioRef.current?.play();
      setPlayStatus('pause');
    } catch (err) {
      console.log('自动播放音乐 err', err);
      message.error('自动播放音乐出现错误，请点击左上角进行播放！', 3);
    }
  };

  // 播放进度条
  const [interval, setInterval] = useState<number | null>(null);
  useInterval(() => {
    const currentTime = audioRef.current?.currentTime || 0;
    const duration = audioRef.current?.duration || 0;
    if (currentTime && duration && currentTime >= duration) {
      setProgress(1);
      setInterval(null);
      return;
    }
    setProgress((audioRef.current?.currentTime || 0) / duration);
  }, interval);
  useEffect(() => {
    if (playStatus === 'pause') {
      setInterval(50);
      return;
    }
    setInterval(null);
  }, [playStatus]);

  // 点赞
  const onLike = async () => {
    if (isLike) {
      if (timer) clearTimeout(timer);

      setLikeHint(true);
      timer = setTimeout(() => setLikeHint(false), 2000);
    } else {
      await articleLike(header.likeId);
      setIsLike(true);
      // 更新 article 内部的点赞状态
      // this.$emit('liked', true);

      localStorage.setItem(`like-${header.likeId}`, 'true');
    }
  };

  useEffect(() => {
    if (header.likeId) {
      const liked = localStorage.getItem(`like-${header.likeId}`);
      console.log('liked', header.likeId, liked);
      if (liked) setIsLike(true);
    }
  }, [header.likeId]);

  // 音乐
  useEffect(() => {
    if (!header.autoPlayMusic) return;
    changeMusic();
  }, [header.autoPlayMusic]);

  return (
    <header style={{ height: 50 }}>
      <div
        className={classNames({
          [styles['header-content']]: true,
          [styles.show]: header.sticky && scroll_current >= 100,
        })}
      >
        <div
          className={classNames({
            [styles.icon]: true,
          })}
        >
          <div className={styles['logo-img']} onClick={toPage.bind(undefined, '/')}>
            <span style={{ fontSize: 18 }}>Leroy</span>
          </div>
          <Iconfont
            type={playStatus}
            className={classNames({
              [styles.iconfont]: true,
            })}
            onClick={changeMusic}
          />
        </div>

        <div
          className={classNames({
            [styles.title]: true,
            [styles.active]: scroll_current >= 100,
            [styles.show]: header.titleShow,
          })}
        >
          {header.title}
        </div>

        <div
          className={classNames({
            [styles.icon]: true,
          })}
        >
          {/* Article Page */}
          {header.likeId && (
            <Iconfont
              type="like"
              className={classNames({
                [styles.iconfont]: true,
                [styles['icon-like']]: true,
                [styles.like]: isLike,
              })}
              onClick={onLike}
            />
          )}

          <span className={styles.myself} onClick={toPage.bind(undefined, '/about')}>
            <Image src={info?.admin?.avatar || ''} alt="" width={26} height={26} loading="eager" />
          </span>
        </div>

        {/* liked hint */}
        {header.likeId && (
          <div
            className={classNames({
              [styles['like-hint-box']]: true,
              [styles.likeHint]: likeHint,
            })}
          >
            <div className={styles['like-hint']}>只能点赞一次哦！</div>
            <span />
            <span />
          </div>
        )}

        {/* Music Progress */}
        <div className={styles.musicBar} style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* mobile music icon */}
      <div className={styles['music-btn']} onClick={changeMusic}>
        <svg
          className="progress-circle"
          viewBox="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
          <circle
            className="progress-bar"
            r="50"
            cx="50"
            cy="50"
            fill="transparent"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <Iconfont
          type={playStatus}
          className={classNames({
            [styles.iconfont]: true,
          })}
          onClick={changeMusic}
        />
      </div>
      {/* music */}
      <audio ref={audioRef} loop preload="auto">
        <source type="audio/mpeg" src={header.music} />
      </audio>
    </header>
  );
};

export default Header;
