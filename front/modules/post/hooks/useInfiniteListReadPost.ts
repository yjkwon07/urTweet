import { useEffect, useMemo, useState } from 'react';

import useSWRInfinite from 'swr/infinite';

import useInfiniteHelper from '@hooks/useInfiniteHelper';
import { getDataFetcher } from '@utils/fetcher';

import { GET_LIST_READ_POST_API, ListReadPostResData, ListReadPostUrlQuery } from '../api';

export default function useInfiniteListReadPost(query: SubPartial<ListReadPostUrlQuery, 'page'>) {
  const [fetchData, setFetchData] = useState<ListReadPostResData>();

  const prevResult = useSWRInfinite<ListReadPostResData[]>(
    (nextPage) =>
      GET_LIST_READ_POST_API({
        page: nextPage + 1,
        pageSize: query.pageSize,
        hashtag: query.hashtag,
        userId: query.userId,
      }),
    getDataFetcher,
  );

  const data = useMemo(
    () => prevResult.data && prevResult.data.flat().map((postPageData) => postPageData.list),
    [prevResult],
  );

  useEffect(() => {
    const result = prevResult.data && prevResult.data.flat();
    if (result) {
      setFetchData(result[result.length - 1]);
    }
  }, [prevResult]);

  const result = useInfiniteHelper(prevResult, query.pageSize, fetchData?.list.length);

  return { ...result, data, curPage: fetchData?.curPage, totalCount: fetchData?.totalCount };
}
