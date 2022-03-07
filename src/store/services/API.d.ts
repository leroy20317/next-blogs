/**
 * @author: leroy
 * @date: 2021/9/26 15:07
 * @description：API.d
 */

declare namespace API {
  type Response<T = undefined> = {
    status: string;
    body: T;
  };

  type LoadingStatus = 'more' | 'loading' | 'nomore' | undefined;

  type Info = {
    bg_music: {
      mood: string;
      letter: string;
      about: string;
    };
    _id: string;
    comment: {
      email: string;
      name: string;
      mark: string;
    };
    cover: {
      image: string;
      color: string;
      title: string;
      description: string;
      link: string;
      date: string;
    };
    admin: {
      avatar: string;
      name: string;
      upload_type: number;
    };
    web: {
      description: string;
      seo: string;
      icp: string;
      address: string;
      name: string;
    };
    __v: number;
  };

  namespace Article {
    type Detail = {
      like: number;
      read: number;
      hide: boolean;
      music: {
        url: string;
        name: string;
      };
      image: {
        url: string;
        name: string;
      };
      _id: string;
      title: string;
      content: string;
      time: string;
      describe: string;
      __v: number;
    };

    type List = {
      total: number;
      data: Detail[];
      page: number;
      size: number;
      totalPage: number;
    };

    type Mood = {
      total: number;
      data: Record<string, Record<string, Detail[]>>;
      page: number;
      size: number;
      totalPage: number;
    };
  }

  namespace Envelope {
    type Detail = {
      _id: string;
      content: string;
      time: string;
      __v: number;
    };

    type List = {
      total: number;
      data: Detail[];
      page: number;
      size: number;
      totalPage: number;
    };
  }
  type About = {
    _id: string;
    content: string;
    __v: number;
  };
}
