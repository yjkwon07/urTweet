import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/rootReducer';

import {
  IPostState,
  listReadFilterChange,
  listReadFilterReset,
  listReadPost,
  listReadReset,
  postSelector,
} from '../slice';

interface IProps {
  mode: 'infinite' | 'page';
}

export default function useListReadPost({ mode }: IProps) {
  const dispatch = useDispatch();
  const { status, data: result } = useFetchStatus(listReadPost.TYPE);
  const filter = useAppSelector(postSelector.listReadFilter);
  const data = useAppSelector(postSelector.listData);

  const isInitFetch = useRef(!!data.length);
  const isMoreRead = useMemo(() => result?.length, [result?.length]);

  const resetData = useCallback(() => {
    dispatch(listReadReset());
  }, [dispatch]);

  const filterChange = useCallback(
    (filters: Partial<IPostState['listReadFilter']>) => {
      dispatch(listReadFilterChange(filters));
    },
    [dispatch],
  );

  const refresh = useCallback(() => {
    resetData();
    dispatch(listReadFilterReset());
  }, [dispatch, resetData]);

  const load = useCallback(() => {
    dispatch(
      listReadPost.request({ page: filter.page, pageSize: filter.pageSize }, { isLoadMore: mode === 'infinite' }),
    );
  }, [dispatch, filter.page, filter.pageSize, mode]);

  useEffect(() => {
    if (!isInitFetch.current) {
      load();
    } else {
      isInitFetch.current = false;
    }
  }, [load]);

  return { status, data, isMoreRead, filter, resetData, load, filterChange, refresh };
}
