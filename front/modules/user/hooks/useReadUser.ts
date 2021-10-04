import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ReadUserRes, ReadUserUrlQuery } from '../api';
import { userAction, userSelector } from '../slice';

export default function useReadUser(filter?: ReadUserUrlQuery) {
  const dispatch = useDispatch();
  const { status, data: result } = useFetchStatus<ReadUserRes>(userAction.readUser.TYPE);
  const data = useAppSelector(userSelector.userData);

  const isInitFetch = useRef(!!data);
  const error = useMemo(() => (status === 'FAIL' ? result : null), [result, status]);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(userAction.readUser.request({ userId: filter.userId }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error };
}
