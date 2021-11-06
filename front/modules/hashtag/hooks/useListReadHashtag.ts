import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { ListReadHashtagUrlQuery } from '../api';
import { hashtagAction, hashtagSelector } from '../slice';

export default function useListReadHashtag() {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(hashtagAction.fetchListReadHashtag));
  const data = useAppSelector(hashtagSelector.listData);
  const { curPage, rowsPerPage, isMoreRead, totalCount } = useAppSelector(hashtagSelector.state);

  const fetch = useCallback(
    (query: ListReadHashtagUrlQuery) => {
      if (query.keyword) {
        dispatch(hashtagAction.fetchListReadHashtag.request(query));
      }
    },
    [dispatch],
  );

  return { status, data, error, curPage, rowsPerPage, isMoreRead, totalCount, fetch };
}
