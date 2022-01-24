/**
 * @author: leroy
 * @date: 2022-01-15 15:11
 * @description：评论
 */
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';

const Comment: FC<{ clientID?: string; clientSecret?: string }> = ({ clientID, clientSecret }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!clientID || !clientSecret || !ref.current) {
      return;
    }
    new Gitalk({
      clientID,
      clientSecret,
      repo: 'blog-comments', // The repository of store comments,
      owner: 'leroy20317',
      admin: ['leroy20317'],
      id: window.location.pathname, // Ensure uniqueness and length less than 50
      distractionFreeMode: false, // Facebook-like distraction free mode
    }).render(ref.current);
  }, []);

  return (
    <div style={{ paddingBottom: 50 }}>
      <div ref={ref} />
    </div>
  );
};
export default Comment;
