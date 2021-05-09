import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadPostURL } from '../@types/query';
import postSelector from '../selector';
import { infinteListReadPost } from '../slice';

export default function useInfiniteListPost({ pageSize }: IListReadPostURL) {
  const dispatch = useDispatch();
  const { status, data: fetchData } = useFetchStatus(infinteListReadPost.TYPE);
  const data = useAppSelector(postSelector.infiniteList) || [];

  const hasMoreRead = useMemo(() => status === 'SUCCESS' && fetchData?.length === pageSize, [
    fetchData?.length,
    pageSize,
    status,
  ]);

  useEffect(() => {
    if (status === undefined) dispatch(infinteListReadPost.requset({ pageSize }));
  }, [dispatch, pageSize, status]);

  return { status, data, hasMoreRead };
}
