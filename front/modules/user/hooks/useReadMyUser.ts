import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';
import { getUserId } from '@utils/auth';

import { userAction, userSelector } from '../slice';

export default function useReadMyUser() {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(userAction.fetchReadMyUser));
  const data = useAppSelector(userSelector.myData);

  const fetch = useCallback(() => {
    if (getUserId()) dispatch(userAction.fetchReadMyUser.request());
  }, [dispatch]);

  return { status, data, error, fetch };
}
