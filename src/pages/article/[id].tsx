/**
 * @Author: leroy
 * @Date: 2022-01-15 10:32
 * @LastEditTime: 2025-02-05 11:12:58
 * @Description: [id]
 */

import styles from '@/styles/pages/detail.module.scss';
import type { AppState } from '@/store/store';
import { saveHeaderData } from '@/store/slices/header';
import { saveSEO } from '@/store/slices/seo';
import { getDetail } from '@/store/slices/article';
import type { NextPage } from 'next';
import { useAppSelector } from '@/store/store';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useSize, useScroll } from 'ahooks';
import { useEffect, useState } from 'react';

const Markdown = dynamic(() => import('@/components/Markdown'), { ssr: false });
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false });

// 进度条
const Scrollbar = () => {
  const [progress, setProgress] = useState(0);
  const size = useSize(() => document.body);
  const { top: scrollTop } = useScroll(() => document) || {};
  useEffect(() => {
    if (size?.height && scrollTop) {
      setProgress(scrollTop / (size.height - window.innerHeight));
      return;
    }
    if (!scrollTop) {
      setProgress(0);
    }
  }, [size?.height, scrollTop]);
  return <div className={styles.scrollbar} style={{ transform: `scaleX(${progress})` }} />;
};

const Detail: NextPage = () => {
  const { detail: data } = useAppSelector((state) => ({ detail: state.article.detail }));
  return (
    <section className={styles.detail}>
      <Scrollbar />

      <h1 className={styles.title}>{data?.title}</h1>
      <div className={styles.stuff}>
        <span>{dayjs(data?.time).locale('zh-cn').format('MMMM DD, YYYY')}</span>
        <span>阅读 {data?.read}</span>
        <span>字数 {data?.content.length}</span>
        <span>喜欢 {data?.like}</span>
      </div>
      <div className={styles.content}>
        <Markdown value={data?.content || ''} />
      </div>
      <Comment
        clientSecret={process.env.COMMENT_CLIENT_SECRET}
        clientID={process.env.COMMENT_CLIENT_ID}
      />
    </section>
  );
};
Detail.getInitialProps = async ({ store, req, query }) => {
  const {
    article: { detail },
    common: { info },
  } = store.getState() as AppState;

  const save = async (payload) => {
    await store.dispatch(
      saveHeaderData({
        title: payload.title,
        music: payload.music.url,
        autoPlayMusic: true,
        sticky: true,
        likeId: payload._id,
      }),
    );
    await store.dispatch(
      saveSEO({
        title: `${payload.title}`,
        keywords: info?.web.seo,
        description: payload.describe,
      }),
    );
  };

  const fetch = async () => {
    if (!detail || detail._id !== query.id) {
      const data = await store.dispatch(getDetail({ id: query.id as string })).unwrap();
      await save(data);
      return;
    }
    await save(detail);
  };
  if (req) {
    await fetch();
  } else {
    fetch();
  }

  return { title: info?.web.name };
};
export default Detail;
