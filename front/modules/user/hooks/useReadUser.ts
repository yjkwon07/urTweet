import { useCallback, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { userAction, userSelector } from '../slice';

export default function useReadUser() {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(userAction.fetchReadUser));
  const { selectId } = useAppSelector(userSelector.state);
  const data = useAppSelector(userSelector.userData);

  const isInitFetch = useRef(!!data);

  const changeSelectId = useCallback(
    (selectId) => {
      dispatch(userAction.changeSelectId(selectId));
    },
    [dispatch],
  );

  const fetch = useCallback(() => {
    if (!isInitFetch.current && selectId) {
      dispatch(userAction.fetchReadUser.request({ userId: selectId }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, selectId]);

  return { status, data, error, selectId, fetch, changeSelectId };
}
