import { CustomAxiosError } from '@typings/type';

export default function isCustomAxiosError(payload: any): payload is CustomAxiosError {
  return typeof payload === 'object' && payload.response;
}
