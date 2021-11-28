/**
 * @author: leroy
 * @date: 2021/8/23 16:09
 * @description：store
 */
import { createContext, useContext } from 'react';

import { enableStaticRendering } from 'mobx-react';
import type { CommonState } from './mobx/common';
import { CommonStore } from './mobx/common';
import type { SeoState } from './mobx/seo';
import { SeoStore } from './mobx/seo';

class RootStore {
  common: CommonStore;
  seo: SeoStore;

  constructor() {
    this.common = new CommonStore();
    this.seo = new SeoStore();
  }
}

export type Store = InstanceType<typeof RootStore>;
export type IState = Partial<{
  common: CommonState;
  seo: SeoState;
}>;

let store: Store;

enableStaticRendering(typeof window === 'undefined');

export const StoreContext = createContext<Store>({} as RootStore);

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}

export function initializeStore(initialData: Store | null = null) {
  const _store = store ?? new RootStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    Object.entries(initialData).forEach(([key, val]) => {
      _store[key].hydrate(val);
    });
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}
