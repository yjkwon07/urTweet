import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadHashtagPostURL } from '../api/requestAPI';
import postSelector from '../selector';
import { listReadHashTagPost } from '../slice';

export interface IProps extends IListReadHashtagPostURL {
  isInitFetch?: boolean;
}

export default function useInfiniteHashTagPost({ hashtag, lastId, pageSize, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(listReadHashTagPost.TYPE);
  const data = useAppSelector(postSelector.infiniteHashTagPost);

  const hasMoreRead = useMemo(() => data?.length && data.length % pageSize === 0, [data?.length, pageSize]);

  useEffect(() => {
    if (isInitFetch && status === undefined && hashtag)
      dispatch(listReadHashTagPost.requset({ hashtag, lastId, pageSize }));
  }, [dispatch, pageSize, status, hashtag, lastId, isInitFetch]);

  return { status, data, hasMoreRead };
}
