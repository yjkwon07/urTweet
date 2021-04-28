import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { FETCH_STATUS } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import userSelector from '../selector';
import { readMyUser } from '../slice';

export default function useMyUser() {
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state[FETCH_STATUS][readMyUser.TYPE]?.status);
  const data = useAppSelector(userSelector.myData);

  useEffect(() => {
    if (status === undefined) dispatch(readMyUser.requset());
  }, [dispatch, status]);

  return { status, data };
}
