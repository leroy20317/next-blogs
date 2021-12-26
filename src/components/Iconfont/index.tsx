/**
 * @author: leroy
 * @date: 2021-12-11 16:10
 * @description：iconfont
 */
import classNames from 'classnames';
import type { CSSProperties, FC } from 'react';

const Iconfont: FC<
  { type: string; className?: string; style?: CSSProperties } & JSX.IntrinsicElements['i']
> = ({ type, className, style, ...other }) => (
  <i
    style={{ fontStyle: 'normal', ...style }}
    className={classNames({
      iconfont: true,
      ['icon-' + type]: true,
      [className || '']: true,
    })}
    {...other}
  />
);
export default Iconfont;
