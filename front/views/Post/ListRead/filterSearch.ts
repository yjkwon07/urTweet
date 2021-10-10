import { ParsedUrlQuery } from 'querystring';

import { clone } from 'lodash';
import Router from 'next/router';

export const DEFAULT_CUR_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
export const DEFAULT_MODE = 'infinite';

export type ViewMode = 'infinite' | 'page';

export interface Query {
  page: number;
  pageSize: number;
  hashtag: string;
  mode: string;
}

export function parseQuery(query: Partial<Query>): Query {
  const mode = (query.mode as ViewMode) || DEFAULT_MODE;
  const page = Number(query.page) && mode !== 'infinite' ? Number(query.page) : DEFAULT_CUR_PAGE;
  const pageSize = Number(query.pageSize) || DEFAULT_PER_PAGE;
  const hashtag = (query.hashtag as string) || '';

  return {
    page,
    pageSize,
    hashtag,
    mode,
  };
}

export function getQueryString({ page, pageSize, hashtag, mode }: Partial<Query>) {
  return `?page=${page}&pageSize=${pageSize}&hashtag=${hashtag || ''}&mode=${mode}`;
}

export function replaceQuery({ page, pageSize, hashtag, mode }: Partial<Query>, parsedQuery?: ParsedUrlQuery) {
  const query = clone(parsedQuery || {});
  if (page) query.page = page.toString();
  if (pageSize) query.pageSize = pageSize.toString();
  if (hashtag !== undefined) query.hashtag = hashtag;
  if (mode) query.mode = mode;
  return query;
}

export default function filterSearch(
  pathname: string,
  parsedQuery: ParsedUrlQuery,
  { page, pageSize, hashtag, mode }: Partial<Query>,
) {
  const query = replaceQuery({ page, pageSize, hashtag, mode }, parsedQuery);

  Router.push({
    pathname,
    query,
  });
}
