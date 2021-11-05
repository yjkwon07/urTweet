import { useCallback, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';
import { CustomAxiosError } from '@typings/type';

import { ListReadFollowRes } from '../api';
import { userAction, userSelector } from '../slice';

export default function useListReadFollow() {
  const dispatch = useDispatch();

  const { status, error } = useAppSelector(
    fetchStatusSelector.byType<ListReadFollowRes, CustomAxiosError>(userAction.fetchListReadFollow.TYPE),
  );
  const data = useAppSelector(userSelector.followListData);
  const {
    followerFilter: filter,
    isMoreFollowerRead: isMoreRead,
    followerTotalCount: totalCount,
  } = useAppSelector(userSelector.state);

  const isInitFetch = useRef(!!data.length);

  const changeFilter = useCallback(
    (filter) => {
      dispatch(userAction.changeFollowerFilter({ filter }));
    },
    [dispatch],
  );

  const fetch = useCallback(() => {
    if (!isInitFetch.current && filter) {
      dispatch(userAction.fetchListReadFollow.request(filter));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error, filter, isMoreRead, totalCount, fetch, changeFilter };
}
