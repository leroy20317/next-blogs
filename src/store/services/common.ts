/**
 * @author: leroy
 * @date: 2021/8/23 16:11
 * @description：common
 */
import Url from '@/utils/url';
import api from '@/utils/api';

export async function fetchInfo() {
  return api<API.Response<API.Info>>(Url.info, {
    method: 'GET',
  });
}
