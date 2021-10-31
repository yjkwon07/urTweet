import { clone } from 'lodash';
import Router from 'next/router';

import { PageFilter } from '@typings/type';

export interface Query {
  page: number;
  pageSize: number;
  hashtag: string;
  mode: ViewMode;
}

const pageFilter: PageFilter<Query> = {
  defaultOption: {
    DEFAULT_CUR_PAGE: 1,
    DEFAULT_PER_PAGE: 10,
    DEFAULT_MODE: 'infinite',
  },
  parseQuery(query) {
    const mode = (query.mode as ViewMode) || this.defaultOption.DEFAULT_MODE;
    const page = Number(query.page) && mode !== 'infinite' ? Number(query.page) : this.defaultOption.DEFAULT_CUR_PAGE;
    const pageSize = Number(query.pageSize) || this.defaultOption.DEFAULT_PER_PAGE;
    const hashtag = (query.hashtag as string) || '';

    return {
      page,
      pageSize,
      hashtag,
      mode,
    };
  },
  queryString({ page, pageSize, hashtag, mode }) {
    return `?page=${page}&pageSize=${pageSize}&hashtag=${hashtag || ''}&mode=${mode}`;
  },
  replaceQuery({ page, pageSize, hashtag, mode }, parsedQuery) {
    const query = clone(parsedQuery || {});
    if (page) query.page = page.toString();
    if (pageSize) query.pageSize = pageSize.toString();
    if (hashtag !== undefined) query.hashtag = hashtag;
    if (mode) query.mode = mode;
    return query;
  },
  filterSearch(pathname, parsedQuery, { page, pageSize, hashtag, mode }) {
    const query = this.replaceQuery({ page, pageSize, hashtag, mode }, parsedQuery);

    Router.push({
      pathname,
      query,
    });
  },
};

export default pageFilter;
