import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IUserURL } from '../api/requestAPI';
import { readUser, userSelector } from '../slice';

export interface IProps extends IUserURL {
  isInitFetch?: boolean;
}

export default function useUser({ userId, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readUser.TYPE);
  const data = useAppSelector(userSelector.userData);

  useEffect(() => {
    if (isInitFetch && status === undefined && userId) dispatch(readUser.requset({ userId }));
  }, [dispatch, isInitFetch, status, userId]);

  return { status, data };
}
