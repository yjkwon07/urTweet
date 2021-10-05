import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ListReadFollowingRes, ListReadFollowingUrlQuery } from '../api';
import { userAction, userSelector } from '../slice';

export default function useListReadFollowing(filter?: ListReadFollowingUrlQuery) {
  const dispatch = useDispatch();
  const { status, data: result } = useFetchStatus<ListReadFollowingRes>(userAction.listReadFollowing.TYPE);
  const data = useAppSelector(userSelector.followingListData);

  const isInitFetch = useRef(!!data.length);
  const error = useMemo(() => (status === 'FAIL' ? result : null), [result, status]);
  const isMoreRead = useMemo(() => !!result?.resData?.nextPage || false, [result?.resData?.nextPage]);
  const totalCount = useMemo(() => result?.resData?.totalCount || 0, [result?.resData?.totalCount]);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(userAction.listReadFollowing.request(filter));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error, isMoreRead, totalCount };
}
