import { ParsedUrlQuery } from 'querystring';

import { AxiosResponse } from 'axios';

export type CustomAxiosError<T = any> = {
  response: AxiosResponse<T>;
};

export interface IPageFilter<T> {
  replaceQuery: (query: Partial<T>) => void;
  queryString: () => string;
  url: () => string;
  search: (query: Partial<T>) => void;
}
