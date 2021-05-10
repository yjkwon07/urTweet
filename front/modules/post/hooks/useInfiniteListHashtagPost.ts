import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadHashtagPostURL } from '../@types/query';
import postSelector from '../selector';
import { listReadHashTagPost } from '../slice';

export interface IProps extends IListReadHashtagPostURL {
  isInitFetch?: boolean;
}

export default function useInfiniteListUserPost({ hashtag, lastId, pageSize, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status, data: fetchData } = useFetchStatus(listReadHashTagPost.TYPE);
  const data = useAppSelector(postSelector.infiniteList) || [];

  const hasMoreRead = useMemo(() => status === 'SUCCESS' && fetchData?.length === pageSize, [
    fetchData?.length,
    pageSize,
    status,
  ]);

  useEffect(() => {
    if (isInitFetch && status === undefined && hashtag)
      dispatch(listReadHashTagPost.requset({ hashtag, lastId, pageSize }));
  }, [dispatch, pageSize, status, hashtag, lastId, isInitFetch]);

  return { status, data, hasMoreRead };
}
