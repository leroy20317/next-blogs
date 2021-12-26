/**
 * @author: leroy
 * @date: 2021-12-09 15:04
 * @description：CreatePortal
 */
import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

const CreatePortal = ({
  refCurrent,
  id,
  children,
}: {
  refCurrent?: Element;
  id?: string;
  children: ReactNode;
}) => {
  return ReactDOM.createPortal(
    children,
    refCurrent || document.getElementById(id || '') || document.body,
  );
};

export default CreatePortal;
