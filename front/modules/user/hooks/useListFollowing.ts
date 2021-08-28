import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { useAppSelector } from '@modules/store/rootReducer';

import { ListReadFollowingURL } from '../api';
import { listReadFollowing, userSelector } from '../slice';

export interface IProps extends ListReadFollowingURL {
  isInitFetch?: boolean;
}

export default function useListFollowing({ pageSize, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(listReadFollowing.TYPE);
  const data = useAppSelector(userSelector.followingListData);

  const hasMoreRead = useMemo(() => data?.length === pageSize, [data?.length, pageSize]);

  useEffect(() => {
    if (isInitFetch && status === undefined) dispatch(listReadFollowing.request({ pageSize }));
  }, [dispatch, isInitFetch, pageSize, status]);

  return { status, data, hasMoreRead };
}
