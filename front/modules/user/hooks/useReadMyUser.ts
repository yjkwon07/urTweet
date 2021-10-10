import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';
import { getUserId } from '@utils/auth';

import { ReadMyUserRes } from '../api';
import { userAction, userSelector } from '../slice';

export default function useReadMyUser() {
  const dispatch = useDispatch();
  const { status, error } = useFetchStatus<ReadMyUserRes>(userAction.readMyUser.TYPE);
  const data = useAppSelector(userSelector.myData);

  const isInitFetch = useRef(!!data);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (getUserId()) dispatch(userAction.readMyUser.request({}));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch]);

  return { status, data, error };
}
