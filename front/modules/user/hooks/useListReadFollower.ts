import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';
import { CustomAxiosError } from '@typings/type';

import { ListReadFollowerUrlQuery, ListReadFollowerRes } from '../api';
import { userAction, userSelector } from '../slice';

export default function useListReadFollower() {
  const dispatch = useDispatch();

  const { status, error } = useAppSelector(
    fetchStatusSelector.byType<ListReadFollowerRes, CustomAxiosError>(userAction.fetchListReadFollower.TYPE),
  );
  const data = useAppSelector(userSelector.followerListData);
  const { curPage, rowsPerPage, isMoreRead, totalCount } = useAppSelector(userSelector.follower);

  const fetch = useCallback(
    (query: ListReadFollowerUrlQuery) => {
      dispatch(userAction.fetchListReadFollower.request(query));
    },
    [dispatch],
  );

  return { status, data, error, curPage, rowsPerPage, isMoreRead, totalCount, fetch };
}
