import Router from 'next/router';

import { Page } from '@typings/type';

const PATH_NAME = '/404';

export default class PageFilter implements Page {
  pathname: string;

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
