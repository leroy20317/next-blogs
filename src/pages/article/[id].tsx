/**
 * @author: leroy
 * @date: 2022-01-15 10:32
 * @description：[id]
 */

import styles from '@/styles/pages/detail.module.scss';
import type { AppState } from '@/store/store';
import { saveHeaderData } from '@/store/slices/header';
import { saveTDK } from '@/store/slices/seo';
import { getDetail } from '@/store/slices/article';
import type { NextPage } from 'next';
import { useAppSelector } from '@/store/store';
import dynamic from 'next/dynamic';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { useScroll, useSize } from 'ahooks';
import { useEffect, useState } from 'react';

const Markdown = dynamic(() => import('@/components/Markdown'), { ssr: false });
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false });

const Detail: NextPage = () => {
  const { detail: data } = useAppSelector((state) => ({ detail: state.article.detail }));
  // 进度条
  const [progress, setProgress] = useState(0);
  const size = useSize(() => document.body);
  const scroll = useScroll(() => document);
  useEffect(() => {
    if (size?.height && scroll?.top) {
      setProgress(scroll.top / (size.height - window.innerHeight));
      return;
    }
    if (!scroll?.top) {
      setProgress(0);
    }
  }, [size, scroll]);
  return (
    <section className={styles.detail}>
      <div className={styles.scrollbar} style={{ transform: `scaleX(${progress})` }} />
      <h1 className={styles.title}>{data?.title}</h1>
      <div className={styles.stuff}>
        <span>{moment(data?.time).locale('zh-cn').format('MMMM DD, YYYY')}</span>
        <span>阅读 {data?.read}</span>
        <span>字数 {data?.content.length}</span>
        <span>喜欢 {data?.like}</span>
      </div>
      <div className={styles.content}>
        <Markdown value={data?.content || ''} />
      </div>
      <Comment clientSecret={process.env.CLIENT_SECRET} clientID={process.env.CLIENT_ID} />
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
      saveTDK({
        title: `${payload.title}`,
        keywords: info?.web.seo,
        description: payload.describe,
      }),
    );
  };

  const fetch = async () => {
    if (!detail || detail._id !== query.id) {
      const { payload } = await store.dispatch(getDetail({ id: query.id as string }));
      await save(payload);
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
