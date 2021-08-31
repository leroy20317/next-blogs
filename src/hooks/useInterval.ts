/**
 * @author: leroy
 * @date: 2021/8/28 09:32
 * @description：useInterval
 */

import { useEffect, useRef } from 'react';

/**
 *
 * @param callback
 * @param delay
 * @example
 export default () => {
  const [count, setCount] = useState(0);
  const [interval, setInterval] = useState(1000);

  useInterval(
    () => {
      setCount(count + 1);
    },
    interval,
  );

  return (
    <div>
      <p> count: {count} </p>
      <p style={{ marginTop: 16 }}> interval: {interval} </p>
      <button onClick={() => setInterval(interval + 1000)} style={{ marginRight: 8 }}>
        interval + 1000
      </button>
      <button
        style={{ marginRight: 8 }}
        onClick={() => {
          setInterval(1000);
        }}
      >
        reset interval
      </button>
      <button
        onClick={() => {
          setInterval(null);
        }}
      >
        clear
      </button>
    </div>
  );
};
 */
const useInterval = (callback: Function, delay: number | null) => {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any) => savedCallback.current?.(...args);
    let timer;
    if (delay !== null) {
      timer = setInterval(handler, delay);
      return () => clearInterval(timer);
    }
    return undefined;
  }, [delay]);
};
export default useInterval;
