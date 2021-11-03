import { useCallback, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { postSelector, postAction } from '../slice';

export default function useReadPost() {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(postAction.fetchReadPost));
  const { selectId } = useAppSelector(postSelector.state);
  const data = useAppSelector((state) => selectId && postSelector.selectById(state, selectId));

  const isInitFetch = useRef(!!data);

  const changeSelectId = useCallback(
    (selectId) => {
      dispatch(postAction.changeSelectId(selectId));
    },
    [dispatch],
  );

  const fetch = useCallback(() => {
    if (!isInitFetch.current && selectId) {
      dispatch(postAction.fetchReadPost.request({ postId: selectId }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, selectId]);

  return { status, data, error, selectId, fetch, changeSelectId };
}
