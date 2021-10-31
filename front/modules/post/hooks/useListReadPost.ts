import { useCallback, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { ListReadPostUrlQuery } from '../api';
import { postAction, postSelector } from '../slice';

export default function useListReadPost() {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(postAction.fetchListReadPost));
  const data = useAppSelector(postSelector.listData);
  const { isMoreRead, totalCount } = useAppSelector(postSelector.state);

  const isInitFetch = useRef(!!data.length);

  const fetch = useCallback(
    ({ mode, query }: { mode: 'infinite' | 'page'; query: ListReadPostUrlQuery }) => {
      if (!isInitFetch.current) {
        if (query) dispatch(postAction.fetchListReadPost.request(query, { isLoadMore: mode === 'infinite' }));
      } else {
        isInitFetch.current = false;
      }
    },
    [dispatch],
  );

  return { status, data, error, isMoreRead, totalCount, fetch };
}
