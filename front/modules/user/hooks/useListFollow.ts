import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { FETCH_STATUS } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import userSelector from '../selector';
import { listReadFollow } from '../slice';

export default function useListFollow() {
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state[FETCH_STATUS][listReadFollow.TYPE]?.status);
  const data = useAppSelector(userSelector.followListData);

  const [pageSize, setPageSize] = useState(3);
  const isReachingData = useMemo(() => data && data?.length < pageSize, [data, pageSize]);

  useEffect(() => {
    dispatch(listReadFollow.requset({ pageSize }));
  }, [dispatch, pageSize]);

  return { status, data, setPageSize, isReachingData };
}
