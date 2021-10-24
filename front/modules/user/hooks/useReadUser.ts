import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { ReadUserUrlQuery } from '../api';
import { userAction, userSelector } from '../slice';

export default function useReadUser(filter?: ReadUserUrlQuery) {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(userAction.fetchReadUser));
  const data = useAppSelector(userSelector.userData);

  const isInitFetch = useRef(!!data);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(userAction.fetchReadUser.request(filter));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error };
}
