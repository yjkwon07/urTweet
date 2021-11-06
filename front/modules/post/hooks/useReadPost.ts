import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { postSelector, postAction } from '../slice';

export default function useReadPost() {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(postAction.fetchReadPost));
  const data = useAppSelector(postSelector.data);

  const fetch = useCallback(
    (postId: number) => {
      if (postId) {
        dispatch(postAction.fetchReadPost.request({ postId }));
      }
    },
    [dispatch],
  );

  return { status, data, error, fetch };
}
