/**
 * @author: leroy
 * @date: 2021/9/26 15:07
 * @description：API.d
 */

declare namespace API {
  type Response<T> = {
    status: string;
    body: T;
  };

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
}
