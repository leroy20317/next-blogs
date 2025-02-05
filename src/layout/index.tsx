/*
 * @Author: leroy
 * @Date: 2023-11-17 10:55:01
 * @LastEditTime: 2025-02-05 11:00:07
 * @Description: Layout
 */

import Header from '@/components/Header';
import SEO from './SEO';
import Footer from './Footer';
import type { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode; hideHeader?: boolean; hideFooter?: boolean }> = ({
  children,
  hideHeader,
  hideFooter,
}) => (
  <>
    <main>
      {!hideHeader && <Header />}
      {children}
    </main>
    <SEO />
    {!hideFooter && <Footer />}
  </>
);
export default Layout;
