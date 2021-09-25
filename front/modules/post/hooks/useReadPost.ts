import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ReadPostUrlQuery } from '../api';
import { postSelector, postAction } from '../slice';

export default function useReadPost(query: ReadPostUrlQuery) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(postAction.readPost.TYPE);
  const data = useAppSelector(postSelector.data);

  const isInitFetch = useRef(!!data.length);

  useEffect(() => {
    if (!isInitFetch.current) {
      dispatch(postAction.readPost.request({ postId: query.postId }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, query.postId, status]);

  return { status, data };
}
