/**
 * @author: leroy
 * @date: 2021-12-25 15:41
 * @description：Menu
 */

import Link from 'next/link';
import styles from './index.module.scss';
import classNames from 'classnames';

const Menu = () => {
  const list = [
    {
      title: 'Article',
      url: 'article',
    },
    {
      title: 'Rainy',
      url: 'rain',
    },
    {
      title: 'Envelope',
      url: 'envelope',
    },
    // {
    //   title: 'Subscribe',
    //   url: 'subscribe',
    // },
    // {
    //   title: 'Message',
    //   url: 'message',
    // },
    {
      title: 'About',
      url: 'about',
    },
  ];
  return (
    <div
      className={classNames({
        nav: true,
        [styles.nav]: true,
      })}
    >
      <ul className={styles['nav-list']}>
        {list.map((item) => (
          <li key={item.title}>
            <Link href={`/${item.url}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.world}>
        <span>Everywhere in the world has a similar life.</span>
      </div>
    </div>
  );
};

export default Menu;
