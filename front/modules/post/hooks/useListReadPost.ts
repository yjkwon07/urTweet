import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/rootReducer';

import { ListReadPostUrlQuery } from '../api';
import { listReadPost, postSelector } from '../slice';

interface IProps {
  mode?: 'infinite' | 'page';
  filter?: ListReadPostUrlQuery;
}

export default function useListReadPost({ mode, filter }: IProps) {
  const dispatch = useDispatch();
  const { status, data: result } = useFetchStatus(listReadPost.TYPE);
  const data = useAppSelector(postSelector.listData);

  const isInitFetch = useRef(!!data.length);
  const isMoreRead = useMemo(() => result?.resData.nextPage, [result?.resData.nextPage]);
  const totalCount = useMemo(() => result?.resData.totalCount, [result?.resData.totalCount]);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(listReadPost.request(filter, { isLoadMore: mode === 'infinite' }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter, mode]);

  return { status, data, isMoreRead, totalCount };
}
