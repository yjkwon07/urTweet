import useSWR from 'swr';

import { getDataFetcher } from '@utils/fetcher';

import { ListReadFollowerUrlQuery, ListReadFollowerResData, GET_LIST_READ_FOLLOWER_API } from '../api';

export default function useListReadFollower(query: ListReadFollowerUrlQuery) {
  const result = useSWR<ListReadFollowerResData>(GET_LIST_READ_FOLLOWER_API(query), getDataFetcher);

  return {
    ...result,
    data: result.data?.list,
    curPage: result.data?.curPage,
    rowsPerPage: result.data?.rowsPerPage,
    isReachingEndData: !!result.data?.nextPage,
    totalCount: result.data?.totalCount || 0,
  };
}
