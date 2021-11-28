/**
 * @author: leroy
 * @date: 2021/11/3 11:22
 * @description：seo
 */
import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

enableStaticRendering(typeof window === 'undefined');

type SEO = Partial<{
  title: string;
  keywords: string;
  description: string;
}>;

export class SeoStore {
  title: string | undefined = "Leroy's Blog";
  keywords: string | undefined = 'Leroy,Blog';
  description: string | undefined =
    'Good morning, and in case I don’t see you, good afternoon, good evening, and good night...';

  hydrate = (data?: SEO) => {
    if (!data) return;
    Object.entries(data).forEach(([key, val]) => {
      if (key) this[key] = val;
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type SeoState = Partial<InstanceType<typeof SeoStore>>;
