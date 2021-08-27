/**
 * @author: leroy
 * @date: 2021/8/27 18:21
 * @description：_error
 */
import { Button, Result } from 'antd';

const tip = {
  401: 'Sorry, you are not authorized to access this page.',
  404: 'Sorry, the page you visited does not exist.',
  500: 'Sorry, something went wrong.',
};

const ErrorPage = ({ statusCode }) => {
  return (
    <Result
      status={statusCode}
      title={statusCode}
      subTitle={tip[statusCode]}
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
export default ErrorPage;
