/**
 * @Author: leroy
 * @Date: 2022-01-13 11:36
 * @LastEditTime: 2025-02-05 11:11:48
 * @Description: envelope
 */
import type { AppState } from '@/store/store';
import { useAppSelector } from '@/store/store';
import { saveHeaderData } from '@/store/slices/header';
import { saveSEO } from '@/store/slices/seo';
import { getEnvelopes } from '@/store/slices/envelope';
import styles from '@/styles/pages/envelope.module.scss';
import dayjs from 'dayjs';
import LoadMore from '@/components/LoadMore';
import { useEffect } from 'react';
import type { NextPage } from 'next';
import ReactMarkdown from 'react-markdown';

const Envelope: NextPage = () => {
  const { list, status } = useAppSelector((state) => state.envelope);
  useEffect(() => {
    document.body.classList.add(styles.container);
    return () => {
      document.body.classList.remove(styles.container);
    };
  }, []);
  return (
    <section className={styles.content}>
      {list?.data.length ? (
        <>
          {list?.data.map((envelope) => (
            <div className={styles.item} key={envelope._id}>
              <div className={styles.text}>
                <ReactMarkdown>{envelope?.content || ''}</ReactMarkdown>
              </div>
              <div className={styles.time}>
                {dayjs(envelope.time).locale('en').format('MMM Do, YYYY')}
              </div>
            </div>
          ))}
          <LoadMore status={status} />
        </>
      ) : (
        <div className={styles['data-null']}>空无一物，就像你我一样。</div>
      )}
    </section>
  );
};

Envelope.getInitialProps = async ({ store, req }) => {
  const {
    article: { list },
    common: { info },
  } = store.getState() as AppState;

  await store.dispatch(
    saveHeaderData({
      title: '予给你一封信',
      music: info?.bg_music.letter,
      autoPlayMusic: true,
    }),
  );
  await store.dispatch(saveSEO({ title: `一封信 | ${info?.web.name}` }));
  if (!list || list.page < list.totalPage) {
    if (req) {
      await store.dispatch(getEnvelopes());
    } else {
      store.dispatch(getEnvelopes());
    }
  }
  return { title: `一封信 | ${info?.web.name}` };
};
export default Envelope;
