import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ReadPostUrlQuery } from '../api';
import { postSelector, readPost } from '../slice';

export default function useReadPost(query: ReadPostUrlQuery) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readPost.TYPE);
  const data = useAppSelector(postSelector.data);

  useEffect(() => {
    dispatch(readPost.request({ postId: query.postId }));
  }, [dispatch, query.postId, status]);

  return { status, data };
}
