import { useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ListReadFollowURL } from '../api';
import { listReadFollow, userSelector } from '../slice';

export interface IProps extends ListReadFollowURL {
  isInitFetch?: boolean;
}

export default function useListFollow({ pageSize, isInitFetch = true }: IProps) {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(listReadFollow.TYPE);
  const data = useAppSelector(userSelector.followListData);

  const hasMoreRead = useMemo(() => data?.length === pageSize, [data?.length, pageSize]);

  useEffect(() => {
    if (isInitFetch && status === undefined) dispatch(listReadFollow.request({ pageSize }));
  }, [dispatch, isInitFetch, pageSize, status]);

  return { status, data, hasMoreRead };
}
