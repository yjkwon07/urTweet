import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { FETCH_STATUS } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IUserURL } from '../@types/query';
import userSelector from '../selector';
import { readUser } from '../slice';

export default function useUser({ userId }: IUserURL) {
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state[FETCH_STATUS][readUser.TYPE]?.status);
  const data = useAppSelector(userSelector.userData);

  useEffect(() => {
    if (status === undefined && userId) dispatch(readUser.requset({ userId }));
  }, [dispatch, status, userId]);

  return { status, data };
}
