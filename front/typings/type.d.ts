import { ParsedUrlQuery } from 'querystring';

import { AxiosResponse } from 'axios';

export type CustomAxiosError<T = any> = {
  response: AxiosResponse<T>;
};

export interface PageQueryFilter<T> extends Page, QueryFilter<T> {}

export interface Page {
  url: () => string;
  search: () => void;
}

export interface QueryFilter<T> {
  replaceQuery: (query: Partial<T>) => T;
  queryString: () => string;
}
