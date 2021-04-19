import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { FETCH_STATUS } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import postSelector from '../selector';
import { listReadPost } from '../slice';

export default function useListPost(isupdate = false) {
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state[FETCH_STATUS][listReadPost.TYPE]?.status);
  const data = useAppSelector(postSelector.list) || [];

  useEffect(() => {
    if (status === undefined || isupdate) dispatch(listReadPost.requset({}));
  }, [dispatch, isupdate, status]);

  return { status, data };
}
