import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ListReadPostUrlQuery } from '../api';
import { postAction, postSelector } from '../slice';

interface IProps {
  mode?: 'infinite' | 'page';
  filter?: ListReadPostUrlQuery;
}

export default function useListReadPost({ mode, filter }: IProps) {
  const dispatch = useDispatch();
  const { status, data: result } = useFetchStatus(postAction.listReadPost.TYPE);
  const data = useAppSelector(postSelector.listData);

  const isInitFetch = useRef(!!data.length);
  const error = useMemo(() => (status === 'FAIL' ? result : null), [result, status]);
  const isMoreRead = useMemo(() => result?.resData?.nextPage || false, [result?.resData?.nextPage]);
  const totalCount = useMemo(() => result?.resData?.totalCount || 0, [result?.resData?.totalCount]);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(postAction.listReadPost.request(filter, { isLoadMore: mode === 'infinite' }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter, mode]);

  return { status, data, error, isMoreRead, totalCount };
}
