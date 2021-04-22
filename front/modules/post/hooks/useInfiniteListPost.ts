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
  const data = useAppSelector(postSelector.infiniteList) || [];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEAFULT_PAGE_SIZE);
  const offset = useMemo(() => (page - 1) * pageSize, [page, pageSize]);
  const hasMoreRead = useMemo(() => data.length >= offset + pageSize, [data.length, offset, pageSize]);

  useEffect(() => {
    dispatch(infinteListReadPost.requset({ offset, pageSize }));
  }, [dispatch, offset, pageSize]);

  return { status, data, hasMoreRead, setPage, setPageSize };
}
