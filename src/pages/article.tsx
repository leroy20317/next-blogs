/**
 * @author: leroy
 * @date: 2022-01-09 14:57
 * @description：article
 */

import type { AppState } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getArticles } from '@/store/slices/article';
import type { NextPage } from 'next';
import styles from '@/styles/pages/article.module.scss';
import { saveHeaderData } from '@/store/slices/header';
import Url from '@/utils/url';
import moment from 'moment';
import { saveTDK } from '@/store/slices/seo';
import LoadMore from '@/components/LoadMore';
import Link from 'next/link';

moment.locale('en');
const enMon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const Article: NextPage = () => {
  const { list, status } = useAppSelector((state) => ({
    list: state.article.list,
    status: state.article.status,
  }));
  const dispatch = useAppDispatch();
  return (
    <div className={styles['article-list']}>
      <section className={styles.list}>
        {list && Object.keys(list.data).length > 0 ? (
          <>
            {Object.entries(list.data).map(([year, value]) => (
              <div key={year} className={styles['year-list']}>
                {Object.entries(value).map(([month, moods]) => (
                  <ul key={month} className={styles['month-list']}>
                    <li className={styles.month}>
                      {enMon[Number(month) - 1]}, {year.slice(1, 5)}
                    </li>
                    <ul className={styles['day-list']}>
                      {moods.map((article) => (
                        <li key={article._id}>
                          <div className={styles['item-l']}>
                            <Link href={`/article/${article._id}`} passHref>
                              <div className={styles.img}>
                                <img
                                  src={
                                    article.image.url || `${Url.staticHost}/image/other/default.jpg`
                                  }
                                  alt=""
                                />
                              </div>
                            </Link>
                            <div className={styles.tit}>
                              <Link href={`/article/${article._id}`}>
                                <a>{article.title}</a>
                              </Link>
                              <span>
                                {article.like} LIKE / {article.read} READ
                              </span>
                            </div>
                          </div>
                          <span className={styles['item-r']}>
                            {moment(article.time).format('Do')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </ul>
                ))}
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
          </>
        ) : (
          <div className={styles['year-list']}>空无一物，就像你我一样。</div>
        )}
      </section>
    </div>
  );
};
Article.getInitialProps = async ({ store, req }) => {
  const {
    article: { list },
    common: { info },
  } = store.getState() as AppState;

  await store.dispatch(
    saveHeaderData({
      title: '加油啦',
      music: info?.bg_music.mood,
      autoPlayMusic: true,
      likeId: '',
    }),
  );
  await store.dispatch(saveTDK({ title: `Article | ${info?.web.name}` }));
  if (!list || list.page < list.totalPage) {
    if (req) {
      await store.dispatch(getArticles());
    } else {
      store.dispatch(getArticles());
    }
  }
  return { title: `Article | ${info?.web.name}` };
};
export default Article;
