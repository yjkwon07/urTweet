import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/rootReducer';

import { readMyUser, userSelector } from '../slice';

export default function useMyUser() {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readMyUser.TYPE);
  const data = useAppSelector(userSelector.myData);

  const isInitFetch = useRef(!!data);

  useEffect(() => {
    if (!isInitFetch.current) {
      dispatch(readMyUser.request({}));
    }
  }, [dispatch]);

  return { status, data };
}
