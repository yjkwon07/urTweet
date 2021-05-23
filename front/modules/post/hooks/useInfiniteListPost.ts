import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadPostURL } from '../api/requestAPI';
import postSelector from '../selector';
import { infinteListReadPost } from '../slice';

export interface IProps extends IListReadPostURL {
  isInitFetch?: boolean;
}

export default function useInfiniteListPost({ pageSize, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(infinteListReadPost.TYPE);
  const data = useAppSelector(postSelector.infiniteList) || [];

  const hasMoreRead = useMemo(() => data?.length % pageSize === 0, [data?.length, pageSize]);

  useEffect(() => {
    if (isInitFetch && status === undefined) {
      dispatch(infinteListReadPost.requset({ pageSize }));
    }
  }, [dispatch, isInitFetch, pageSize, status]);

  return { status, data, hasMoreRead };
}
