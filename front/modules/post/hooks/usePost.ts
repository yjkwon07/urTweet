import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { IPostURL } from '../api/requestAPI';
import { postSelector, readPost } from '../slice';

export interface IProps extends IPostURL {
  isInitFetch?: boolean;
}

export default function usePost({ postId, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readPost.TYPE);
  const data = useAppSelector(postSelector.data);

  useEffect(() => {
    if (isInitFetch && status === undefined) dispatch(readPost.request({ postId }));
  }, [dispatch, isInitFetch, postId, status]);

  return { status, data };
}
