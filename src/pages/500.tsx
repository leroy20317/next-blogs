/**
 * @author: leroy
 * @date: 2021/8/28 10:05
 * @description：500
 */
import ErrorPage from '@/layout/Error';

export default function Custom500() {
  return <ErrorPage statusCode={500} />;
}
