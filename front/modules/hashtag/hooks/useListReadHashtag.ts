import useSWR from 'swr';

import { getDataFetcher } from '@utils/fetcher';

import { GET_LIST_READ_HASHTAG_API, ListReadHashtagResData, ListReadHashtagUrlQuery } from '../api';

export default function useListReadHashtag(query: ListReadHashtagUrlQuery) {
  const result = useSWR<ListReadHashtagResData>(GET_LIST_READ_HASHTAG_API(query), getDataFetcher);

  return {
    ...result,
    data: result.data?.list,
    curPage: result.data?.curPage,
    totalCount: result.data?.totalCount || 0,
  };
}
