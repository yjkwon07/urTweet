import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';

import { searchFilterAction, searchFilterSelector } from '../slice';

/**
 * @param key api 키 이름
 * @param initQuery 초기값으로 세팅 => filter 값이 있으면 initQuery로 바뀌지 않음
 */
export default function useSearchFilter<T>(key: string, initQuery?: T) {
  const dispatch = useDispatch();
  const filter: T | undefined = useAppSelector(searchFilterSelector.searchFilter)[key];

  const resetFilter = useCallback(() => {
    dispatch(searchFilterAction.resetSearchFilter(key));
  }, [dispatch, key]);

  const changeFilter = useCallback(
    (filter: Partial<T>) => {
      dispatch(searchFilterAction.changeSearchFilter({ key, filter }));
    },
    [dispatch, key],
  );

  useEffect(() => {
    if (!filter && initQuery) changeFilter(initQuery);
  }, [changeFilter, filter, initQuery]);

  return { filter, changeFilter, resetFilter };
}
