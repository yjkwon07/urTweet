import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/rootReducer';

import { readMyUser, userSelector } from '../slice';

export interface IProps {
  isInitFetch?: boolean;
}

export default function useMyUser({ isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readMyUser.TYPE);
  const data = useAppSelector(userSelector.myData);

  useEffect(() => {
    if (status === 'INIT') dispatch(readMyUser.request({}));
  }, [dispatch, isInitFetch, status]);

  return { status, data };
}
