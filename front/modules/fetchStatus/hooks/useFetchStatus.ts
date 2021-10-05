import { useAppSelector } from '@hooks/useAppRedux';

import { FetchStatus } from '../slice';

export default function useFetchStatus<T = any>(type: string, actionId?: any): { status: FetchStatus; data: T } {
  const { status, data, actionList } = useAppSelector(
    (state) =>
      state.FETCH_STATUS[type] || {
        status: 'INIT',
        actionList: [],
        data: null,
      },
  );

  if (actionId && actionList && !actionList.includes(actionId)) {
    return { status: 'INIT', data };
  }
  return { status, data };
}
