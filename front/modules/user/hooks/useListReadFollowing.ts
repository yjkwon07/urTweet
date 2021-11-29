import useSWR from 'swr';

import { getDataFetcher } from '@utils/fetcher';

import { ListReadFollowingUrlQuery, ListReadFollowingResData, GET_LIST_READ_FOLLOWING_API } from '../api';

export default function useListReadFollowing(query: ListReadFollowingUrlQuery) {
  const result = useSWR<ListReadFollowingResData>(GET_LIST_READ_FOLLOWING_API(query), getDataFetcher);

  return {
    ...result,
    data: result.data?.list,
    curPage: result.data?.curPage,
    rowsPerPage: result.data?.rowsPerPage,
    isReachingEndData: !!result.data?.nextPage,
    totalCount: result.data?.totalCount || 0,
  };
}
