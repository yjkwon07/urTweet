import useSWR from 'swr';

import { getItemDataFetcher } from '@utils/fetcher';

import { Post } from '../@types';
import { GET_READ_POST_API, ReadPostUrlQuery } from '../api';

export default function useReadPost(query: ReadPostUrlQuery) {
  return useSWR<Post>(GET_READ_POST_API(query), getItemDataFetcher);
}
