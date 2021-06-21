import { useEffect, useState } from 'react';

import { useAppSelector } from '@modules/store/slices';

import { IFetchStatus } from '../slice';

export default function useFetchStatus(type: string, actionId?: any) {
  const [status, setStatus] = useState<IFetchStatus | undefined>(undefined);
  const fetchStatus = useAppSelector((state) => state.FETCH_STATUS[type]?.status);
  const data = useAppSelector((state) => state.FETCH_STATUS[type]?.data);
  const actionList = useAppSelector((state) => state.FETCH_STATUS[type]?.actionList);

  useEffect(() => {
    if (actionId && actionList) {
      if (actionList.indexOf(actionId) > -1) {
        setStatus(fetchStatus);
      } else setStatus(undefined);
    } else {
      setStatus(fetchStatus);
    }
  }, [actionId, actionList, fetchStatus]);

  return { status, data };
}
