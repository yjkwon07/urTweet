import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';
import { CustomAxiosError } from '@typings/type';

import { ListReadFollowRes, ListReadFollowUrlQuery } from '../api';
import { userAction, userSelector } from '../slice';

export default function useListReadFollow(filter?: ListReadFollowUrlQuery) {
  const dispatch = useDispatch();
  const {
    status,
    data: result,
    error,
  } = useAppSelector(
    fetchStatusSelector.byType<ListReadFollowRes, CustomAxiosError>(userAction.fetchListReadFollow.TYPE),
  );
  const data = useAppSelector(userSelector.followListData);

  const isInitFetch = useRef(!!data.length);
  const isMoreRead = useMemo(() => !!result?.resData?.nextPage || false, [result?.resData?.nextPage]);
  const totalCount = useMemo(() => result?.resData?.totalCount || 0, [result?.resData?.totalCount]);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(userAction.fetchListReadFollow.request(filter));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error, isMoreRead, totalCount };
}
