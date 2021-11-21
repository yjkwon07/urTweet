import useSWR from 'swr';

import { getUserId } from '@utils/auth';
import { getItemDataFetcher } from '@utils/fetcher';

import { MyUser } from '../@types';
import { GET_READ_MY_USER_API } from '../api';

export default function useReadMyUser() {
  return useSWR<MyUser | null>(GET_READ_MY_USER_API(), (url) => {
    if (!getUserId()) return null;
    return getItemDataFetcher(url);
  });
}
