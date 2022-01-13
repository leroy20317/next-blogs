/**
 * @author: leroy
 * @date: 2022-01-13 14:55
 * @description：about
 */
import type { AppState } from '@/store/store';
import { useAppSelector } from '@/store/store';
import { saveHeaderData } from '@/store/slices/header';
import { saveTDK } from '@/store/slices/seo';
import { getAbout } from '@/store/slices/common';
import styles from '@/styles/pages/about.module.scss';

const About = () => {
  const about = useAppSelector((state) => state.common.about);
  return (
    <div className={styles.about} dangerouslySetInnerHTML={{ __html: about?.contentHtml || '' }} />
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
  await store.dispatch(saveTDK({ title: `你好呀，陌生人！` }));
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
