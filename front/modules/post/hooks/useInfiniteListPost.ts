import { useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { FETCH_STATUS } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import postSelector from '../selector';
import { infinteListReadPost } from '../slice';
import { DEAFULT_PAGE_SIZE } from '../utils/constants';

export default function useInfiniteListPost() {
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state[FETCH_STATUS][infinteListReadPost.TYPE]?.status);
  const fetchData = useAppSelector((state) => state[FETCH_STATUS][infinteListReadPost.TYPE]?.data);
  const data = useAppSelector(postSelector.infiniteList) || [];

  const [lastId, setLastId] = useState(0);
  const [pageSize, setPageSize] = useState(DEAFULT_PAGE_SIZE);
  const hasMoreRead = useMemo(() => fetchData?.length === pageSize, [fetchData?.length, pageSize]);

  useEffect(() => {
    dispatch(infinteListReadPost.requset({ lastId, pageSize }));
  }, [dispatch, lastId, pageSize]);

  return { status, data, hasMoreRead, setLastId, setPageSize };
}
