import { useCallback, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { userAction, userSelector } from '../slice';

export default function useListReadFollowing() {
  const dispatch = useDispatch();

  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(userAction.fetchListReadFollowing));
  const data = useAppSelector(userSelector.followingListData);
  const {
    followingFilter: filter,
    isMoreFollowingRead: isMoreRead,
    followingTotalCount: totalCount,
  } = useAppSelector(userSelector.state);

  const isInitFetch = useRef(!!data.length);

  const changeFilter = useCallback(
    (filter) => {
      dispatch(userAction.changeFollowingFilter({ filter }));
    },
    [dispatch],
  );

  const fetch = useCallback(() => {
    if (!isInitFetch.current && filter) {
      dispatch(userAction.fetchListReadFollowing.request(filter));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error, filter, isMoreRead, totalCount, fetch, changeFilter };
}
