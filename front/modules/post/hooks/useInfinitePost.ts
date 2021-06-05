import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadPostURL } from '../api/requestAPI';
import { infinteListReadPost, postSelector } from '../slice';

export interface IProps extends IListReadPostURL {
  isInitFetch?: boolean;
}

export default function useInfinitePost({ pageSize, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(infinteListReadPost.TYPE);
  const data = useAppSelector(postSelector.infinitePost) || [];

  const hasMoreRead = useMemo(() => data?.length && data.length % pageSize === 0, [data?.length, pageSize]);

  useEffect(() => {
    if (isInitFetch && status === undefined) {
      dispatch(infinteListReadPost.requset({ pageSize }));
    }
  }, [dispatch, isInitFetch, pageSize, status]);

  return { status, data, hasMoreRead };
}
