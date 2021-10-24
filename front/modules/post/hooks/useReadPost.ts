import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { ReadPostUrlQuery } from '../api';
import { postSelector, postAction } from '../slice';

export default function useReadPost(filter?: ReadPostUrlQuery) {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(postAction.fetchReadPost));
  const data = useAppSelector((state) => filter && postSelector.selectById(state, filter.postId));

  const isInitFetch = useRef(!!data);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(postAction.fetchReadPost.request({ postId: filter.postId }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error };
}
