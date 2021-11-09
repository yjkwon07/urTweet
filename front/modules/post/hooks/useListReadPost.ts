import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { ListReadPostUrlQuery } from '../api';
import { postAction, postSelector } from '../slice';

export default function useListReadPost() {
  const dispatch = useDispatch();

  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(postAction.fetchListReadPost));
  const data = useAppSelector(postSelector.listData);
  const { curPage, rowsPerPage, isMoreRead, totalCount } = useAppSelector(postSelector.state);

  const fetch = useCallback(
    (query: ListReadPostUrlQuery, mode: ViewMode) => {
      if (query.page) {
        dispatch(postAction.fetchListReadPost.request(query, { isLoadMore: mode === 'infinite' }));
      }
    },
    [dispatch],
  );

  return { status, data, error, curPage, rowsPerPage, isMoreRead, totalCount, fetch };
}
