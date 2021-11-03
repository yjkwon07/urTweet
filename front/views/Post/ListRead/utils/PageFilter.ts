import qs, { ParsedUrlQuery } from 'querystring';

import { cloneDeep } from 'lodash';
import Router from 'next/router';

import { Page, QueryFilter } from '@typings/type';

const PATH_NAME = '/';

export interface Query {
  page: number;
  pageSize: number;
  hashtag: string;
  mode: ViewMode;
}

export default class PageFilter implements Page, QueryFilter<Query> {
  pathname: string;

  query: Query;

  static defaultOption = {
    DEFAULT_CUR_PAGE: 1,
    DEFAULT_PER_PAGE: 10,
    DEFAULT_MODE: 'infinite',
  };

  static parseQuery(query?: ParsedUrlQuery | Query) {
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

  constructor(query?: ParsedUrlQuery | Query) {
    this.pathname = PATH_NAME;
    this.query = PageFilter.parseQuery(query);
  }

  replaceQuery({ page, pageSize, hashtag, mode }: Partial<Query>) {
    const query = cloneDeep(this.query);
    if (page) query.page = page;
    if (pageSize) query.pageSize = pageSize;
    if (hashtag !== undefined) query.hashtag = hashtag;
    if (mode) query.mode = mode;
    return query;
  }

  queryString() {
    const { page, pageSize, hashtag, mode } = this.query;
    return `?${qs.stringify({ page, pageSize, hashtag, mode })}`;
  }

  url() {
    return `${this.pathname}${this.queryString()}`;
  }

  search(query?: Partial<Query>) {
    const searchQuery = query ? this.replaceQuery(query) : this.query;

    Router.push({
      pathname: this.pathname,
      query: {
        page: searchQuery.page,
        pageSize: searchQuery.pageSize,
        hashtag: searchQuery.hashtag,
        mode: searchQuery.mode,
      },
    });
  }
}
