import useSWR from 'swr';

import { getItemDataFetcher } from '@utils/fetcher';

import { User } from '../@types';
import { GET_READ_USER_API, ReadUserUrlQuery } from '../api';

export default function useReadUser(query: ReadUserUrlQuery) {
  return useSWR<User>(GET_READ_USER_API(query), getItemDataFetcher);
}
