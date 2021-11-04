import Router from 'next/router';

import { Page } from '@typings/type';

const PATH_NAME = '/signup';

export default class PageFilter implements Page {
  pathname: string;

  constructor() {
    this.pathname = PATH_NAME;
  }

  url() {
    return `${this.pathname}`;
  }

  search() {
    Router.push({
      pathname: this.pathname,
    });
  }
}
