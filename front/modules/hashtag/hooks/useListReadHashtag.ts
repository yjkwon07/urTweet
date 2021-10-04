import { useEffect, useMemo, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { useFetchStatus } from '@modules/fetchStatus';

import { ListReadHashtagUrlQuery } from '../api';
import { hashtagAction, hashtagSelector } from '../slice';

interface IProps {
  filter?: ListReadHashtagUrlQuery;
}

export default function useListReadHashtag({ filter }: IProps) {
  const dispatch = useDispatch();
  const { status, data: result } = useFetchStatus(hashtagAction.listReadHashtag.TYPE);
  const data = useAppSelector(hashtagSelector.listData);

  const isInitFetch = useRef(!!data.length);
  const error = useMemo(() => (status === 'FAIL' ? result : null), [result, status]);
  const isMoreRead = useMemo(() => result?.resData?.nextPage || false, [result?.resData?.nextPage]);
  const totalCount = useMemo(() => result?.resData?.totalCount || 0, [result?.resData?.totalCount]);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (filter) dispatch(hashtagAction.listReadHashtag.request(filter));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch, filter]);

  return { status, data, error, isMoreRead, totalCount };
}