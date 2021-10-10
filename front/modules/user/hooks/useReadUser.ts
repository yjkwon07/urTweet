import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ReadUserRes, ReadUserUrlQuery } from '../api';
import { userAction, userSelector } from '../slice';

export default function useReadUser(filter?: ReadUserUrlQuery) {
  const dispatch = useDispatch();
  const { status, error } = useFetchStatus<ReadUserRes>(userAction.readUser.TYPE);
  const data = useAppSelector(userSelector.userData);

  const isInitFetch = useRef(!!data);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(userAction.readUser.request(filter));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error };
}
