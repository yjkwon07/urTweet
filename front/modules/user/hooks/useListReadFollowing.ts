import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { ListReadFollowingUrlQuery } from '../api';
import { userAction, userSelector } from '../slice';

export default function useListReadFollowing() {
  const dispatch = useDispatch();

  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(userAction.fetchListReadFollowing));
  const data = useAppSelector(userSelector.followingListData);
  const { curPage, rowsPerPage, isMoreRead, totalCount } = useAppSelector(userSelector.following);

  const fetch = useCallback(
    (query: ListReadFollowingUrlQuery) => {
      dispatch(userAction.fetchListReadFollowing.request(query));
    },
    [dispatch],
  );

  return { status, data, error, curPage, rowsPerPage, isMoreRead, totalCount, fetch };
}
