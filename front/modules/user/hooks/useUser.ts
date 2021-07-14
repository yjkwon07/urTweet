import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ReadUserURL } from '../api';
import { readUser, userSelector } from '../slice';

export interface IProps extends ReadUserURL {
  isInitFetch?: boolean;
}

export default function useUser({ userId, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readUser.TYPE);
  const data = useAppSelector(userSelector.userData);

  useEffect(() => {
    if (isInitFetch && status === undefined && userId) dispatch(readUser.request({ userId }));
  }, [dispatch, isInitFetch, status, userId]);

  return { status, data };
}
