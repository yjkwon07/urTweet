import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';

import { ListReadPostUrlQuery } from '../api';
import { postAction, postSelector } from '../slice';

interface IProps {
  mode?: 'infinite' | 'page';
  filter?: ListReadPostUrlQuery;
}

export default function useListReadPost({ mode, filter }: IProps) {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(fetchStatusSelector.byFetchAction(postAction.fetchListReadPost));
  const data = useAppSelector(postSelector.listData);
  const isMoreRead = useAppSelector(postSelector.isMoreRead);
  const totalCount = useAppSelector(postSelector.totalCount);

  const isInitFetch = useRef(!!data.length);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(postAction.fetchListReadPost.request(filter, { isLoadMore: mode === 'infinite' }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter, mode]);

  return { status, data, error, isMoreRead, totalCount };
}
