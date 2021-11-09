import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { userAction, userSelector } from '../slice';

export default function useReadUser() {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(userAction.fetchReadUser));
  const data = useAppSelector(userSelector.userData);

  const fetch = useCallback(
    (userId: number) => {
      dispatch(userAction.fetchReadUser.request({ userId }));
    },
    [dispatch],
  );

  return { status, data, error, fetch };
}
