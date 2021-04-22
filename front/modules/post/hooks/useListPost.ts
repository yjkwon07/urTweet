import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { FETCH_STATUS } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import postSelector from '../selector';
import { listReadPost } from '../slice';
import { DEAFULT_PAGE_SIZE, DEFAULT_OFFSET } from '../utils/constants';

export default function useListPost() {
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state[FETCH_STATUS][listReadPost.TYPE]?.status);
  const data = useAppSelector(postSelector.list) || [];

  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [pageSize, setPageSize] = useState(DEAFULT_PAGE_SIZE);

  const setSize = useCallback(
    (page: number) => {
      setOffset((page - 1) * pageSize);
    },
    [pageSize],
  );

  useEffect(() => {
    dispatch(listReadPost.requset({ offset, pageSize }));
  }, [dispatch, offset, pageSize]);

  return { status, data, setSize, setOffset, setPageSize };
}
