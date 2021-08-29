import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@modules/store/rootReducer';

import { ListReadPostUrlQuery } from '../api';
import { listReadFilterChange, postSelector } from '../slice';

export default function useFilter() {
  const dispatch = useDispatch();
  const filter = useAppSelector(postSelector.listReadFilter);

  const filterChange = useCallback(
    (changeFilter: Partial<ListReadPostUrlQuery>) => {
      dispatch(listReadFilterChange(changeFilter));
    },
    [dispatch],
  );

  return { filter, filterChange };
}
