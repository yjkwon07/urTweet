import { AxiosResponse } from 'axios';

export type CustomAxiosError<T = any> = {
  response: AxiosResponse<T>;
};
