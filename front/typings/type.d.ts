import { ParsedUrlQuery } from 'querystring';

import { AxiosResponse } from 'axios';

export type CustomAxiosError<T = any> = {
  response: AxiosResponse<T>;
};

export interface Page {
  readonly url: string;
  search: () => void;
}
