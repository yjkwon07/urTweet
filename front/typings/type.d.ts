import { ParsedUrlQuery } from 'querystring';

import { AxiosResponse } from 'axios';

export type CustomAxiosError<T = any> = {
  response: AxiosResponse<T>;
};

export interface PageFilter<T> {
  defaultOption: {
    [key: string]: string | number;
    DEFAULT_CUR_PAGE: number;
    DEFAULT_PER_PAGE: number;
  };
  parseQuery: (query: Partial<T>) => T;
  queryString: (query: Partial<T>) => string;
  replaceQuery: (query: Partial<T>, parsedQuery?: ParsedUrlQuery) => ParsedUrlQuery;
  filterSearch: (pathname: string, parsedQuery: ParsedUrlQuery, query: Partial<T>) => void;
}
