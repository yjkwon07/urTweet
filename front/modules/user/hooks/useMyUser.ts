import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';

import { readMyUser, userSelector } from '../slice';
import { useAppSelector } from '@hooks/useAppRedux';

export interface IProps {
  isInitFetch?: boolean;
}

export default function useMyUser({ isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readMyUser.TYPE);
  const data = useAppSelector(userSelector.myData);

  useEffect(() => {
    if (isInitFetch && status === undefined) dispatch(readMyUser.request({}));
  }, [dispatch, isInitFetch, status]);

  return { status, data };
}
