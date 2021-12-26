/**
 * @author: leroy
 * @date: 2021-12-12 15:15
 * @description：useScroll
 */
import lodash from 'lodash';
import { useEffect, useState } from 'react';

const useScroll = (scrollFn?: Function) => {
  // 当前滚动条位置
  const [scroll_current, setCurrent] = useState(0);
  // 滚动条触底
  const [scroll_isBottom, setIsBottom] = useState(false);
  // 滚动方向
  const [scroll_direction, setDirection] = useState<'top' | 'bottom' | undefined>(undefined);

  const getWin = (type) => {
    return document.documentElement[type] || document.body[type];
  };

  const handleScroll = () => {
    const type = ['scrollTop', 'scrollHeight', 'clientHeight'];
    const [top, height, windowHeight] = type.map((i) => getWin(i));

    if (height === windowHeight) {
      // 兼容路由切换
      return;
    }
    if (scroll_current && top) {
      // 判断方向
      const direction = top - scroll_current < 0 ? 'top' : 'bottom';
      setDirection(direction);
    }
    setCurrent(top);
    setIsBottom(top + windowHeight >= height - 10);
    scrollFn?.();
  };
  useEffect(() => {
    const fn = lodash.throttle(handleScroll, 100);
    fn();
    window.addEventListener('scroll', fn);
    return () => {
      window.removeEventListener('scroll', fn);
    };
  }, []);

  return { scroll_current, scroll_direction, scroll_isBottom };
};

export default useScroll;
