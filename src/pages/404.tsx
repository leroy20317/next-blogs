/**
 * @author: leroy
 * @date: 2021/8/28 10:05
 * @description：404
 */
import ErrorPage from '@/layout/Error';

export default function Custom404() {
  return <ErrorPage statusCode={404} />;
}
