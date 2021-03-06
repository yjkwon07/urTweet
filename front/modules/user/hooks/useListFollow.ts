import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadFollowURL } from '../api/requestAPI';
import userSelector from '../selector';
import { listReadFollow } from '../slice';

export interface IProps extends IListReadFollowURL {
  isInitFetch?: boolean;
}

export default function useListFollow({ pageSize, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(listReadFollow.TYPE);
  const data = useAppSelector(userSelector.followListData);

  const hasMoreRead = useMemo(() => data?.length === pageSize, [data?.length, pageSize]);

  useEffect(() => {
    if (isInitFetch && status === undefined) dispatch(listReadFollow.requset({ pageSize }));
  }, [dispatch, isInitFetch, pageSize, status]);

  return { status, data, hasMoreRead };
}
