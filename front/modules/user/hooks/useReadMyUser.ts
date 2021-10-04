import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { userAction, userSelector } from '../slice';

export default function useReadMyUser() {
  const dispatch = useDispatch();
  const { status, data: result } = useFetchStatus(userAction.readMyUser.TYPE);
  const data = useAppSelector(userSelector.myData);

  const isInitFetch = useRef(!!data);
  const error = useMemo(() => (status === 'FAIL' ? result : null), [result, status]);

  useEffect(() => {
    if (!isInitFetch.current) {
      dispatch(userAction.readMyUser.request({}));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch]);

  return { status, data, error };
}
