import { useAppSelector } from '@modules/store/rootReducer';

import { FetchStatus } from '../slice';

export default function useFetchStatus(type: string, actionId?: any): { status: FetchStatus; data: any } {
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
