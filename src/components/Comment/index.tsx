/**
 * @author: leroy
 * @date: 2022-01-15 15:11
 * @description：评论
 */
import GitalkComponent from 'gitalk/dist/gitalk-component';
import 'gitalk/dist/gitalk.css';

const Comment = () => {
  return (
    <div style={{ paddingBottom: 50 }}>
      <GitalkComponent
        option={{
          clientID: 'ca94e280d87a0145c117',
          clientSecret: 'a1f79cb33e9e77df658c8840b64376d9aee45ca4',
          repo: 'blog-comments', // The repository of store comments,
          owner: 'leroy20317',
          admin: ['leroy20317'],
          id: window.location.pathname, // Ensure uniqueness and length less than 50
          distractionFreeMode: false, // Facebook-like distraction free mode
        }}
      />
      <style>{`.gt-container .gt-meta{z-index: initial}`}</style>
    </div>
  );
};
export default Comment;
