import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { FETCH_STATUS } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import userSelector from '../selector';
import { listReadFollowing } from '../slice';

export default function useListFollowing() {
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state[FETCH_STATUS][listReadFollowing.TYPE]?.status);
  const data = useAppSelector(userSelector.followingListData);

  const [pageSize, setPageSize] = useState(3);
  const isReachingData = useMemo(() => data && data?.length < pageSize, [data, pageSize]);

  useEffect(() => {
    dispatch(listReadFollowing.requset({ pageSize }));
  }, [dispatch, pageSize]);

  return { status, data, setPageSize, isReachingData };
}
