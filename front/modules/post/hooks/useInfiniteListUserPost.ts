import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadUserPostURL } from '../api/requestAPI';
import postSelector from '../selector';
import { listReadUserPost } from '../slice';

export interface IProps extends IListReadUserPostURL {
  isInitFetch?: boolean;
}

export default function useInfiniteListUserPost({ userId, pageSize, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(listReadUserPost.TYPE);
  const data = useAppSelector(postSelector.infiniteList) || [];

  const hasMoreRead = useMemo(() => data?.length % pageSize === 0, [data?.length, pageSize]);

  useEffect(() => {
    if (isInitFetch && status === undefined && userId) dispatch(listReadUserPost.requset({ userId, pageSize }));
  }, [dispatch, isInitFetch, pageSize, status, userId]);

  return { status, data, hasMoreRead };
}
