import { createAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { createRequestAsyncThunk } from './createRequestAsyncThunk';

export const createRequestAction = <R, S, F = AxiosError, M = any>(type: string) => {
  const REQUEST = `${type}/request`;
  const SUCCESS = `${type}/success`;
  const FAILURE = `${type}/fail`;

  const action = {
    TYPE: type,
    requset: createAction(REQUEST, (payload: R, meta?: M) => ({ payload, meta })),
    success: createAction(SUCCESS, (payload: S, meta?: M) => ({ payload, meta })),
    failure: createAction(FAILURE, (payload: F, meta?: M) => ({ payload, meta })),
  };
  return { ...action, asyncTunk: createRequestAsyncThunk<R, S, M>(action.requset) };
};
