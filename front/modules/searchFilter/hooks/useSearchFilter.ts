import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { changeSearchFilter, resetSearchFilter, searchFilterSelector } from '@modules/searchFilter';
import { useAppSelector } from '@modules/store/rootReducer';

export default function useSearchFilter<T>(key: string, query?: T) {
  const dispatch = useDispatch();
  const filter: T | undefined = useAppSelector(searchFilterSelector.searchFilter)[key];

  const resetFilter = useCallback(() => {
    dispatch(resetSearchFilter(key));
  }, [dispatch, key]);

  const changeFilter = useCallback(
    (filter: Partial<T>) => {
      dispatch(changeSearchFilter({ key, filter }));
    },
    [dispatch, key],
  );

  useEffect(() => {
    if (!filter && query) changeFilter(query);
  }, [changeFilter, filter, query]);

  return { filter, changeFilter, resetFilter };
}
