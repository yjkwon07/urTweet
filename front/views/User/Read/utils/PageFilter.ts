import qs, { ParsedUrlQuery } from 'querystring';

import cloneDeep from 'lodash/cloneDeep';
import Router from 'next/router';

import { Page } from '@typings/type';
import urlParamReplace from '@utils/urlParamReplace';

const PATH_NAME = '/user/:id';

export interface Param {
  id: number;
}

export interface Query {
  page: number;
  pageSize: number;
  userId: number;
  mode: ViewMode;
}

export default class PageFilter implements Page {
  pathname: string;

  param: Param;

  query: Query;

  static defaultOption = {
    DEFAULT_CUR_PAGE: 1,
    DEFAULT_PER_PAGE: 10,
    DEFAULT_MODE: 'infinite',
  };

  static parseParam(param?: ParsedUrlQuery | Partial<Param>) {
    const id = Number(param?.id) || -1;

    return {
      id,
    };
  }

  static parseQuery(query?: ParsedUrlQuery | Partial<Query>) {
    const mode = (query?.mode as ViewMode) || PageFilter.defaultOption.DEFAULT_MODE;
    const page =
      Number(query?.page) && mode !== 'infinite' ? Number(query?.page) : PageFilter.defaultOption.DEFAULT_CUR_PAGE;
    const pageSize = Number(query?.pageSize) || PageFilter.defaultOption.DEFAULT_PER_PAGE;
    const userId = Number(query?.userId) || -1;

    return {
      mode,
      page,
      pageSize,
      userId,
    };
  }

  constructor(param?: ParsedUrlQuery | Partial<Param>, query?: ParsedUrlQuery | Partial<Query>) {
    this.pathname = urlParamReplace(PATH_NAME, PageFilter.parseParam(param));
    this.param = PageFilter.parseParam(param);
    this.query = PageFilter.parseQuery(query);
  }

  get url() {
    return `${this.pathname}${this.queryString()}`;
  }

  private queryString() {
    const { page, pageSize, userId, mode } = this.query;
    return `?${qs.stringify({ page, pageSize, userId, mode })}`;
  }

  private replaceParam({ id }: Partial<Param>) {
    const param = cloneDeep(this.param);
    if (id) param.id = id;
    return param;
  }

  private replaceQuery({ page, pageSize, userId, mode }: Partial<Query>) {
    const query = cloneDeep(this.query);
    if (page) query.page = page;
    if (pageSize) query.pageSize = pageSize;
    if (userId !== undefined) query.userId = userId;
    if (mode) query.mode = mode;
    return query;
  }

  search(param?: Partial<Param>, query?: Partial<Query>) {
    const searchParam = param ? this.replaceParam(param) : this.param;
    const searchQuery = query ? this.replaceQuery(query) : this.query;

    Router.push({
      pathname: urlParamReplace(PATH_NAME, searchParam),
      query: {
        page: searchQuery.page,
        pageSize: searchQuery.pageSize,
        userId: searchQuery.userId,
      },
    });
  }
}
