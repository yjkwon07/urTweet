import { useAppSelector } from '@modules/store/configStore';

import { FETCH_STATUS } from '../slice';

export default function useFetchStatus(type: string) {
  const status = useAppSelector((state) => state[FETCH_STATUS][type]?.status);
  const data = useAppSelector((state) => state[FETCH_STATUS][type]?.data);

  return { status, data };
}
