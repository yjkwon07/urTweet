import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IPostURL } from '../@types/query';
import postSelector from '../selector';
import { readPost } from '../slice';

export interface IProps extends IPostURL {
  isInitFetch?: boolean;
}

export default function usePost({ postId, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readPost.TYPE);
  const data = useAppSelector(postSelector.data) || null;

  useEffect(() => {
    if (isInitFetch && status === undefined) dispatch(readPost.requset({ postId }));
  }, [dispatch, isInitFetch, postId, status]);

  return { status, data };
}
