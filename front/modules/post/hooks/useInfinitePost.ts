import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadPostURL } from '../api/requestAPI';
import { infinteListReadPost, postSelector } from '../slice';

interface IProps {
  query: IListReadPostURL;
  isInitFetch?: boolean;
}

export default function useInfinitePost({ query: { lastId, pageSize }, isInitFetch = false }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(infinteListReadPost.TYPE);
  const data = useAppSelector(postSelector.infinitePost) || [];

  const isInitLoad = useRef(!isInitFetch);
  const hasMoreRead = useMemo(() => data?.length && data.length % pageSize === 0, [data?.length, pageSize]);

  const reload = useCallback(() => {
    dispatch(infinteListReadPost.requset({ lastId, pageSize }));
  }, [dispatch, lastId, pageSize]);

  useEffect(() => {
    if (isInitLoad.current) {
      reload();
    } else {
      isInitLoad.current = !isInitLoad.current;
    }
  }, [reload]);

  return { status, data, hasMoreRead, reload };
}
