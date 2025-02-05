/*
 * @Author: leroy
 * @Date: 2021-12-12 15:15
 * @LastEditTime: 2025-02-05 11:09:22
 * @Description: useScroll
 */
import { throttle } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

const useScroll = (scrollFn?: Function) => {
  // 之前滚动条位置
  const prevCurrent = useRef<number>(0);
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
    // console.log('[top, height, windowHeight]', {
    //   top,
    //   height,
    //   windowHeight,
    //   scroll_current: current.current,
    // });
    if (height === windowHeight) {
      // 兼容路由切换
      return;
    }
    if (prevCurrent.current && top) {
      // 判断方向
      const direction = top - prevCurrent.current < 0 ? 'top' : 'bottom';
      setDirection(direction);
    }
    prevCurrent.current = top;
    setCurrent(top);
    setIsBottom(top + windowHeight >= height - 10);
    scrollFn?.();
  };
  useEffect(() => {
    const fn = throttle(handleScroll, 100);
    fn();
    window.addEventListener('scroll', fn);
    return () => {
      window.removeEventListener('scroll', fn);
    };
  }, []);

  return { scroll_current, scroll_direction, scroll_isBottom };
};

export default useScroll;
