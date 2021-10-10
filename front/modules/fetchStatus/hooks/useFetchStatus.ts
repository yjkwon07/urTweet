import { useAppSelector } from '@hooks/useAppRedux';

import { FetchStatus } from '../slice';

export default function useFetchStatus<T = any, E = any>(
  type: string,
  actionId?: any,
): { status: FetchStatus; data: T | null; error: E | null } {
  const { status, data, actionList } = useAppSelector(
    (state) =>
      state.FETCH_STATUS[type] || {
        status: 'INIT',
        actionList: [],
        data: null,
      },
  );

  if (actionId && actionList && !actionList.includes(actionId)) {
    return { status: 'INIT', data, error: null };
  }
  if (status === 'SUCCESS') {
    return { status, data, error: null };
  }
  if (status === 'FAIL') {
    return { status, data, error: data };
  }
  return { status, data, error: null };
}
