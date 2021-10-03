import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ReadPostUrlQuery } from '../api';
import { postSelector, postAction } from '../slice';

export default function useReadPost(filter?: ReadPostUrlQuery) {
  const dispatch = useDispatch();
  const { status, data: result } = useFetchStatus(postAction.readPost.TYPE);
  const data = useAppSelector((state) => filter && postSelector.selectById(state, filter.postId));

  const isInitFetch = useRef(!!data);
  const error = useMemo(() => (status === 'FAIL' ? result : null), [result, status]);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(postAction.readPost.request({ postId: filter.postId }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error };
}
