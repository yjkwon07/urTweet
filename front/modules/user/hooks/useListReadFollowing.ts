import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';
import { CustomAxiosError } from '@typings/type';

import { ListReadFollowingRes, ListReadFollowingUrlQuery } from '../api';
import { userAction, userSelector } from '../slice';

export default function useListReadFollowing(filter?: ListReadFollowingUrlQuery) {
  const dispatch = useDispatch();
  const { status, data: result } = useAppSelector(
    fetchStatusSelector.byTypeData<ListReadFollowingRes, CustomAxiosError>(userAction.fetchListReadFollowing.TYPE),
  );
  const data = useAppSelector(userSelector.followingListData);

  const isInitFetch = useRef(!!data.length);
  const error = useMemo(() => (status === 'FAIL' ? result : null), [result, status]);
  const isMoreRead = useMemo(() => !!result?.resData?.nextPage || false, [result?.resData?.nextPage]);
  const totalCount = useMemo(() => result?.resData?.totalCount || 0, [result?.resData?.totalCount]);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(userAction.fetchListReadFollowing.request(filter));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error, isMoreRead, totalCount };
}
