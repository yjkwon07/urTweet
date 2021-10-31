import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';

import { postSelector, postAction } from '../slice';

export default function useListReadPostFilter() {
  const dispatch = useDispatch();
  const { filter } = useAppSelector(postSelector.state);

  const resetFilter = useCallback(() => {
    dispatch(postAction.resetSearchFilter());
  }, [dispatch]);

  const changeFilter = useCallback(
    (filter) => {
      dispatch(postAction.changeSearchFilter({ filter }));
    },
    [dispatch],
  );

  return { filter, changeFilter, resetFilter };
}
