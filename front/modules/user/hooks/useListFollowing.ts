import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/slices';

import { IListReadFollowingURL } from '../api/requestAPI';
import userSelector from '../selector';
import { listReadFollowing } from '../slice';

export interface IProps extends IListReadFollowingURL {
  isInitFetch?: boolean;
}

export default function useListFollowing({ pageSize, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(listReadFollowing.TYPE);
  const data = useAppSelector(userSelector.followingListData);

  const hasMoreRead = useMemo(() => data?.length === pageSize, [data?.length, pageSize]);

  useEffect(() => {
    if (isInitFetch && status === undefined) dispatch(listReadFollowing.requset({ pageSize }));
  }, [dispatch, isInitFetch, pageSize, status]);

  return { status, data, hasMoreRead };
}
