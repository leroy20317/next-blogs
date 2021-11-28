/**
 * @author: leroy
 * @date: 2021/11/18 14:32
 * @description：common
 */

import { fetchInfo } from '../services/common';
import { makeAutoObservable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

enableStaticRendering(typeof window === 'undefined');

export class CommonStore {
  info: Partial<API.Info> = {};

  getInfo = async () => {
    try {
      const { body, status } = await fetchInfo();
      if (status === 'success') {
        runInAction(() => {
          this.info = body;
        });
        return body;
      }
      return undefined;
    } catch (e) {
      console.log('common/info', e);
      return e;
    }
  };

  // 服务端数据
  hydrate = (data) => {
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      this[key] = value;
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type CommonState = Partial<InstanceType<typeof CommonStore>>;
