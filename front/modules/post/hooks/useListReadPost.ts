import { useCallback, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { postAction, postSelector } from '../slice';

export default function useListReadPost() {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(postAction.fetchListReadPost));
  const data = useAppSelector(postSelector.listData);
  const { filter, isMoreRead, totalCount } = useAppSelector(postSelector.state);

  const isInitFetch = useRef(!!data.length);

  const fetch = useCallback(() => {
    if (!isInitFetch.current) {
      const { mode, page, pageSize, hashtag, userId } = filter;
      const query = { page, pageSize, hashtag, userId };
      if (query.page) dispatch(postAction.fetchListReadPost.request(query, { isLoadMore: mode === 'infinite' }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error, isMoreRead, totalCount, fetch };
}
