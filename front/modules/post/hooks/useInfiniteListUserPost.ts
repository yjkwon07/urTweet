import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { FETCH_STATUS } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadUserPostURL } from '../@types/query';
import postSelector from '../selector';
import { listReadUserPost } from '../slice';

export default function useInfiniteListUserPost({ userId, pageSize }: IListReadUserPostURL) {
  const dispatch = useDispatch();
  const { status, data: fetchData } = useAppSelector((state) => state[FETCH_STATUS][listReadUserPost.TYPE]) || {};
  const data = useAppSelector(postSelector.infiniteList) || [];

  const hasMoreRead = useMemo(() => status === 'SUCCESS' && fetchData?.length === pageSize, [
    fetchData?.length,
    pageSize,
    status,
  ]);

  useEffect(() => {
    if (status === undefined && userId) dispatch(listReadUserPost.requset({ userId, pageSize }));
  }, [dispatch, pageSize, status, userId]);

  return { status, data, hasMoreRead };
}
