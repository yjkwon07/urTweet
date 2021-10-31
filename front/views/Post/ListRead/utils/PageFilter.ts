import { ParsedUrlQuery } from 'querystring';

import Router from 'next/router';

import { IPageFilter } from '@typings/type';

const PATH_NAME = '/';

export interface Query {
  page: number;
  pageSize: number;
  hashtag: string;
  mode: ViewMode;
}

export default class PageFilter implements IPageFilter<Query> {
  pathname: string;

  query: Query;

  static defaultOption = {
    DEFAULT_CUR_PAGE: 1,
    DEFAULT_PER_PAGE: 10,
    DEFAULT_MODE: 'infinite',
  };

  static parseQuery(query?: ParsedUrlQuery) {
    const mode = (query?.mode as ViewMode) || PageFilter.defaultOption.DEFAULT_MODE;
    const page =
      Number(query?.page) && mode !== 'infinite' ? Number(query?.page) : PageFilter.defaultOption.DEFAULT_CUR_PAGE;
    const pageSize = Number(query?.pageSize) || PageFilter.defaultOption.DEFAULT_PER_PAGE;
    const hashtag = (query?.hashtag as string) || '';

    return {
      mode,
      page,
      pageSize,
      hashtag,
    };
  }

  constructor(query?: ParsedUrlQuery) {
    this.pathname = PATH_NAME;
    this.query = PageFilter.parseQuery(query);
  }

  replaceQuery({ page, pageSize, hashtag, mode }: Partial<Query>) {
    if (page) this.query.page = page;
    if (pageSize) this.query.pageSize = pageSize;
    if (hashtag !== undefined) this.query.hashtag = hashtag;
    if (mode) this.query.mode = mode;
  }

  queryString() {
    const { page, pageSize, hashtag, mode } = this.query;

    return `?page=${page}&pageSize=${pageSize}&hashtag=${hashtag || ''}&mode=${mode}`;
  }

  url() {
    return `${this.pathname}${this.queryString()}`;
  }

  search(query?: Partial<Query>) {
    if (query) this.replaceQuery(query);

    Router.push({
      pathname: this.pathname,
      query: {
        page: this.query.page,
        pageSize: this.query.pageSize,
        hashtag: this.query.hashtag,
        mode: this.query.mode,
      },
    });
  }
}
