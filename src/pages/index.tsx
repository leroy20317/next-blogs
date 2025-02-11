/**
 * @author: leroy
 * @date: 2021/8/21 09:54
 * @description：首页
 */
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '@/styles/pages/home.module.scss';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import LoadMore from '@/components/LoadMore';
import classNames from 'classnames';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { AppState } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Parallax from 'parallax-js';
import { throttle } from 'lodash-es';
import Iconfont from '@/components/Iconfont';
import Menu from '@/components/Menu';
import { getArticles } from '@/store/slices/home';
import Layout from '@/layout';
import { saveSEO } from '@/store/slices/seo';

const Home: NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
} = () => {
  const dispatch = useAppDispatch();
  const { info, list, status } = useAppSelector((state) => ({
    info: state.common.info,
    list: state.home.list,
    status: state.home.status,
  }));
  const [isNav, setIsNav] = useState(false);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [layerStyle, setLayerStyle] = useState<{
    width: number;
    height: number;
    marginLeft: number;
    marginTop: number;
  }>({
    width: 0,
    height: 0,
    marginLeft: 0,
    marginTop: 0,
  });
  const [imgStyle, setImgStyle] = useState<CSSProperties>({});
  const [loading, setLoading] = useState<boolean>(true);
  const scene = useRef<HTMLDivElement>(null);
  const parallax = useRef<Parallax>();
  const [infoIcon] = useState([
    {
      icon: 'text',
      name: 'words',
      text: '善良',
      color: '#EF6D57',
    },
    {
      icon: 'eye',
      name: 'read',
      text: '勇敢',
      color: '#50bcb6',
    },
    {
      icon: 'like',
      name: 'like',
      text: '热爱',
      color: '#ffa800',
    },
  ]);

  const coverImg = () => {
    const { width = 0, height = 0 } = layerStyle || {};
    const ratio = 1080 / 1920;
    const compute = height / width > ratio;

    const style = {
      width: compute ? height / ratio : width,
      height: compute ? height : width * ratio,
    };
    style['left'] = (width - style.width) / 2;
    style['top'] = (height - style.height) / 2;

    setImgStyle({ ...imgStyle, ...style });
  };

  // Cover image box calculation
  const coverLayer = () => {
    const { width: _w, height: _h } = size;
    let x;
    let y;
    let i;
    const e = _w >= 1000 || _h >= 1000 ? 1000 : 500;

    if (_w >= _h) {
      i = (_w / e) * 50;
      y = i;
      x = (i * _w) / _h;
    } else {
      i = (_h / e) * 50;
      x = i;
      y = (i * _h) / _w;
    }
    const style = {
      width: _w + x,
      height: _h + y,
      marginLeft: -0.5 * x,
      marginTop: -0.5 * y,
    };
    setLayerStyle({ ...layerStyle, ...style });
  };

  useEffect(() => {
    if (size.width && size.height) {
      coverLayer();
    }
  }, [size]);

  useEffect(() => {
    if (layerStyle) {
      coverImg();
    }
  }, [layerStyle]);

  const onResize = throttle(() => {
    setSize({
      width: document.documentElement.clientWidth || 0,
      height: document.documentElement.clientHeight || 0,
    });
  }, 500);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (info) {
      const time = new Date().getTime();
      setLoading(true);
      // Cover image loading is complete
      const img = new Image();
      img.src = info?.cover.image || '';
      img.onload = () => {
        // loading 效果最少 500ms
        let timer = 500 - new Date().getTime() + time;
        timer = timer < 0 ? 0 : timer;
        setTimeout(() => {
          setLoading(false);
        }, timer);
      };
    }
  }, [info]);

  useEffect(() => {
    if (loading) {
      return undefined;
    }
    console.log('首页图片加载完成');
    // Cover image init
    parallax.current = new Parallax(scene.current!, {
      relativeInput: true,
      clipRelativeInput: true,
    });
    return () => {
      parallax.current?.destroy?.();
    };
  }, [loading]);

  useEffect(() => {
    if (isNav) {
      document.body.classList.add('hidden');
      return;
    }
    document?.body?.classList?.remove('hidden');
  }, [isNav]);

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.home]: true,
        [styles.navActive]: isNav,
      })}
    >
      <div
        className={styles.cover}
        onMouseEnter={() => parallax.current?.enable()}
        onMouseLeave={() => parallax.current?.disable()}
      >
        <div className={styles.scene} ref={scene} style={{ height: size.height || 0 }}>
          <div className={styles.layer} data-depth="0.4" style={layerStyle}>
            <img
              className={styles.image}
              style={imgStyle}
              src={info?.cover.image}
              width="1920"
              height="1080"
              alt=""
            />
          </div>
        </div>
        <div className={styles.head}>
          <div className={styles['logo-img']}>Leroy‘s Blogs</div>
          <div className={styles.menu} onClick={() => setIsNav(!isNav)}>
            <Iconfont className={styles.iconfont} type={isNav ? 'close' : 'menu'} />
          </div>
        </div>
        <div className={styles.misk} style={{ backgroundColor: info?.cover.color }} />
        <div className={styles.post}>
          <div className={styles.time}>
            {dayjs(info?.cover?.date).locale('zh-cn').format('MMMM DD, YYYY')}
          </div>
          <Link href={info?.cover.link || ''} className={styles.title} title={info?.cover.title}>
            {info?.cover.title}
          </Link>
          <div className={styles.describe}>{info?.cover?.description}</div>
        </div>
        <Menu />
      </div>

      {list && list.total > 0 ? (
        <div className={styles.content}>
          {list?.data.map((item) => (
            <div key={item._id} className={styles.post}>
              <Link href={`/article/${item._id}`} className={styles['img-box']}>
                <img src={item.image.url} alt={item.image.name} />
              </Link>
              <div className={styles.info}>
                <div className={styles.time}>
                  {dayjs(item.time).locale('zh-cn').format('MMMM DD, YYYY')}
                </div>
                <Link href={`/article/${item._id}`} className={styles.title}>
                  {item.title}
                </Link>
                <div className={styles.describe}>{item.describe}</div>
                <div className={styles.stuff}>
                  {infoIcon.map((icon) => (
                    <div key={icon.icon}>
                      <Iconfont className={styles.iconfont} type={icon.icon} />
                      <span>{icon.name === 'words' ? item.content.length : item[icon.name]}</span>
                      <span className={styles.hint} style={{ backgroundColor: icon.color }}>
                        {icon.text}
                        <i style={{ borderTopColor: icon.color }} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div
            className={styles.more}
            onClick={() => {
              if (['nomore', 'loading'].includes(status || '')) {
                return;
              }
              dispatch(getArticles());
            }}
          >
            <LoadMore status={status} />
          </div>
        </div>
      ) : (
        <div className={styles['content-null']}>主人太懒了，还没发表任何文章！！</div>
      )}
    </div>
  );
};

Home.getLayout = (page) => <Layout hideHeader>{page}</Layout>;
Home.getInitialProps = async ({ store, req, query }) => {
  const {
    home: { list },
    common: { info },
  } = store.getState() as AppState;

  if (!list || list.page < list.totalPage) {
    if (req) {
      await store.dispatch(getArticles());
    } else {
      store.dispatch(getArticles());
    }
  }
  await store.dispatch(
    saveSEO({
      title: info?.web?.name || 'Leroy‘s Blogs',
    }),
  );
  return { query };
};

export default Home;
