/*
 * @Author: leroy
 * @Date: 2022-01-13 14:55:49
 * @LastEditTime: 2025-02-05 11:10:57
 * @Description: about
 */

import type { AppState } from '@/store/store';
import { useAppSelector } from '@/store/store';
import { saveHeaderData } from '@/store/slices/header';
import { saveSEO } from '@/store/slices/seo';
import { getAbout } from '@/store/slices/common';
import styles from '@/styles/pages/about.module.scss';
import ReactMarkdown from 'react-markdown';

const About = () => {
  const about = useAppSelector((state) => state.common.about);
  return (
    <div className={styles.about}>
      <ReactMarkdown>{about?.content || ''}</ReactMarkdown>
    </div>
  );
};

About.getInitialProps = async ({ store, req }) => {
  const {
    common: { info, about },
  } = store.getState() as AppState;

  await store.dispatch(
    saveHeaderData({
      title: '嘿，你今天笑了么(≖ᴗ≖)✧',
      music: info?.bg_music.about,
      autoPlayMusic: true,
      titleShow: true,
    }),
  );
  await store.dispatch(saveSEO({ title: `你好呀，陌生人！` }));
  if (!about) {
    if (req) {
      await store.dispatch(getAbout());
    } else {
      store.dispatch(getAbout());
    }
  }
  return { title: 'Hello' };
};
export default About;
