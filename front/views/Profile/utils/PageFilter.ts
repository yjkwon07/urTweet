import Router from 'next/router';

import { Page } from '@typings/type';

const PATH_NAME = '/profile';

export default class PageFilter implements Page {
  pathname: string;

  static defaultOption = {
    DEFAULT_FOLLOWER_CUR_PAGE: 1,
    DEFAULT_FOLLOWER_PER_PAGE: 10,
    DEFAULT_FOLLOWING_CUR_PAGE: 1,
    DEFAULT_FOLLOWING_PER_PAGE: 10,
  };

  constructor() {
    this.pathname = PATH_NAME;
  }

  get url() {
    return `${this.pathname}`;
  }

  search() {
    Router.push({
      pathname: this.pathname,
    });
  }
}
