import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';
import { CustomAxiosError } from '@typings/type';

import { ListReadPostRes, ListReadPostUrlQuery } from '../api';
import { postAction, postSelector } from '../slice';

interface IProps {
  mode?: 'infinite' | 'page';
  filter?: ListReadPostUrlQuery;
}

export default function useListReadPost({ mode, filter }: IProps) {
  const dispatch = useDispatch();
  const {
    status,
    data: result,
    error,
  } = useAppSelector(
    fetchStatusSelector.byTypeData<ListReadPostRes, CustomAxiosError>(postAction.fetchListReadPost.TYPE),
  );
  const data = useAppSelector(postSelector.selectAll);

  const isInitFetch = useRef(!!data.length);
  const isMoreRead = useMemo(() => !!result?.resData?.nextPage || false, [result?.resData?.nextPage]);
  const totalCount = useMemo(() => result?.resData?.totalCount || 0, [result?.resData?.totalCount]);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(postAction.fetchListReadPost.request(filter, { isLoadMore: mode === 'infinite' }));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter, mode]);

  return { status, data, error, isMoreRead, totalCount };
}
