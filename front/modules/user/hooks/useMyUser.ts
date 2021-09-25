import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { readMyUser, userSelector } from '../slice';

export default function useMyUser() {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readMyUser.TYPE);
  const data = useAppSelector(userSelector.myData);

  const isInitFetch = useRef(!!data);

  useEffect(() => {
    if (!isInitFetch.current && status === 'INIT') {
      dispatch(readMyUser.request({}));
    }
  }, [dispatch, status]);

  return { status, data };
}
