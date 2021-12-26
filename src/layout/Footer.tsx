/**
 * @author: leroy
 * @date: 2021/8/28 14:37
 * @description：footer
 */
import { useAppSelector } from '@/store/store';

const Footer = () => {
  const { info } = useAppSelector((state) => ({ info: state.common.info }));
  if (!info?.web?.icp) {
    return null;
  }
  return (
    <footer className="foot">
      <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">
        {info?.web.icp}
      </a>
      <style jsx scoped>{`
        .foot {
          text-align: center;
        }
        .foot a {
          display: inline-block;
          margin: 0 auto;
          padding: 1px 0 2px;
          color: var(--color-text-2);
          font-size: 13px;
          text-decoration: none;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
