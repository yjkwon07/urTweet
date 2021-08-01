import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ListReadPostUrlQuery } from '../api';
import { listReadPost, listReadReset, postSelector } from '../slice';

interface IProps extends SubPartial<ListReadPostUrlQuery, 'lastId'> {
  isInitFetch?: boolean;
}

export default function useInfiniteListReadPost({ pageSize, isInitFetch = false }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(listReadPost.TYPE);
  const data = useAppSelector(postSelector.list);

  const isInitLoaded = useRef(isInitFetch);
  const hasMoreRead = useMemo(() => data?.length && data.length % pageSize === 0, [data?.length, pageSize]);

  const reload = useCallback(() => {
    dispatch(listReadPost.request({ lastId: 0, pageSize }));
  }, [dispatch, pageSize]);

  const reset = useCallback(() => {
    dispatch(listReadReset());
  }, [dispatch]);

  const nextLoad = useCallback(() => {
    const lastId = data.length ? data[data.length - 1].id : 0;
    dispatch(listReadPost.request({ lastId, pageSize }, { isLoadMore: true }));
  }, [data, dispatch, pageSize]);

  useEffect(() => {
    if (!isInitLoaded.current) {
      reload();
    } else {
      isInitLoaded.current = !isInitLoaded.current;
    }
  }, [reload]);

  return { status, data, hasMoreRead, reload, reset, nextLoad };
}
