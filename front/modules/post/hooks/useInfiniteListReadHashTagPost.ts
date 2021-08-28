import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/rootReducer';

import { ListReadHashtagPostUrlQuery } from '../api';
import { listReadHashTagPost, listReadReset, postSelector } from '../slice';

interface IProps extends SubPartial<ListReadHashtagPostUrlQuery, 'lastId'> {
  isInitFetch?: boolean;
}

export default function useInfiniteListReadHashTagPost({ hashtag, pageSize, isInitFetch = false }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(listReadHashTagPost.TYPE);
  const data = useAppSelector(postSelector.listData);

  const isInitLoaded = useRef(isInitFetch);
  const hasMoreRead = useMemo(() => data?.length && data.length % pageSize === 0, [data?.length, pageSize]);

  const reload = useCallback(() => {
    dispatch(listReadHashTagPost.request({ hashtag, lastId: 0, pageSize }));
  }, [dispatch, hashtag, pageSize]);

  const reset = useCallback(() => {
    dispatch(listReadReset);
  }, [dispatch]);

  const nextLoad = useCallback(() => {
    const lastId = data.length ? data[data.length - 1].id : 0;
    if (hasMoreRead) dispatch(listReadHashTagPost.request({ hashtag, lastId, pageSize }, { isLoadMore: true }));
  }, [data, dispatch, hasMoreRead, hashtag, pageSize]);

  useEffect(() => {
    if (!isInitLoaded.current) {
      reload();
    } else {
      isInitLoaded.current = !isInitLoaded.current;
    }
  }, [reload]);

  return { status, data, hasMoreRead, reload, reset, nextLoad };
}
