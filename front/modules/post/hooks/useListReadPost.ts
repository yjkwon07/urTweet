import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/rootReducer';

import { ListReadPostUrlQuery } from '../api';
import { listReadPost, listReadReset, postSelector } from '../slice';

interface IProps {
  filter: ListReadPostUrlQuery;
  mode: 'infinite' | 'page';
}

export default function useListReadPost({ filter, mode }: IProps) {
  const dispatch = useDispatch();

  const { status, data: result } = useFetchStatus(listReadPost.TYPE);
  const data = useAppSelector(postSelector.listData);

  const isInitFetch = useRef(!!data.length);
  const isMoreRead = useMemo(() => result?.nextPage, [result?.nextPage]);

  const resetData = useCallback(() => {
    dispatch(listReadReset());
  }, [dispatch]);

  const load = useCallback(() => {
    const { page, pageSize, hashtag } = filter;
    dispatch(listReadPost.request({ page, pageSize, hashtag }, { isLoadMore: mode === 'infinite' }));
  }, [dispatch, filter, mode]);

  useEffect(() => {
    if (!isInitFetch.current) {
      load();
    } else {
      isInitFetch.current = false;
    }
  }, [load]);

  return { status, data, isMoreRead, resetData, load };
}
