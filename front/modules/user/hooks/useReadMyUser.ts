import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';
import { CustomAxiosError } from '@typings/type';
import { getUserId } from '@utils/auth';

import { ReadMyUserRes } from '../api';
import { userAction, userSelector } from '../slice';

export default function useReadMyUser() {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(
    fetchStatusSelector.byTypeData<ReadMyUserRes, CustomAxiosError>(userAction.readMyUser.TYPE),
  );
  const data = useAppSelector(userSelector.myData);

  const isInitFetch = useRef(!!data);

  useEffect(() => {
    if (!isInitFetch.current) {
      if (getUserId()) dispatch(userAction.readMyUser.request({}));
    } else {
      isInitFetch.current = false;
    }
  }, [dispatch]);

  return { status, data, error };
}
