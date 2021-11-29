import useSWR from 'swr';

import { getDataFetcher } from '@utils/fetcher';

import { GET_LIST_READ_POST_API, ListReadPostResData, ListReadPostUrlQuery } from '../api';

export default function useListReadPost(query: ListReadPostUrlQuery) {
  const result = useSWR<ListReadPostResData>(GET_LIST_READ_POST_API(query), getDataFetcher);

  return {
    ...result,
    data: result.data?.list,
    curPage: result.data?.curPage,
    totalCount: result.data?.totalCount || 0,
  };
}
