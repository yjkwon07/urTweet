import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { readMyUser, userSelector } from '../slice';

export interface IProps {
  isInitFetch?: boolean;
}

export default function useMyUser({ isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(readMyUser.TYPE);
  const data = useAppSelector(userSelector.myData);

  useEffect(() => {
    if (isInitFetch && status === undefined) dispatch(readMyUser.requset({}));
  }, [dispatch, isInitFetch, status]);

  return { status, data };
}
