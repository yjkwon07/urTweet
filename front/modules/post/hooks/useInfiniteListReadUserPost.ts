import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/rootReducer';

import { ListReadUserPostUrlQuery } from '../api';
import { listReadReset, listReadUserPost, postSelector } from '../slice';

interface IProps extends SubPartial<ListReadUserPostUrlQuery, 'lastId'> {
  isInitFetch?: boolean;
}

export default function useInfiniteListReadUserPost({ userId, pageSize, isInitFetch = false }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(listReadUserPost.TYPE);
  const data = useAppSelector(postSelector.listData);

  const isInitLoaded = useRef(isInitFetch);
  const hasMoreRead = useMemo(() => data?.length && data.length % pageSize === 0, [data?.length, pageSize]);

  const reload = useCallback(() => {
    dispatch(listReadUserPost.request({ userId, lastId: 0, pageSize }));
  }, [dispatch, pageSize, userId]);

  const reset = useCallback(() => {
    dispatch(listReadReset);
  }, [dispatch]);

  const nextLoad = useCallback(() => {
    const lastId = data.length ? data[data.length - 1].id : 0;
    dispatch(listReadUserPost.request({ userId, lastId, pageSize }, { isLoadMore: true }));
  }, [data, dispatch, pageSize, userId]);

  useEffect(() => {
    if (!isInitLoaded.current) {
      reload();
    } else {
      isInitLoaded.current = !isInitLoaded.current;
    }
  }, [reload]);

  return { status, data, hasMoreRead, reload, reset, nextLoad };
}
