import { createAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { createRequestAsyncThunk } from './createRequestAsyncThunk';

export const createRequestAction = <R, S, M = any, F = any>(
  type: string,
  requestAPI?: (query: R) => Promise<AxiosResponse<S>>,
) => {
  const REQUEST = `${type}/request`;
  const SUCCESS = `${type}/success`;
  const FAILURE = `${type}/fail`;

  const action = {
    TYPE: type,
    requestAPI,
    requset: createAction(REQUEST, (payload: R, meta?: M) => ({ payload, meta })),
    success: createAction(SUCCESS, (payload: S, meta?: M) => ({ payload, meta })),
    failure: createAction(FAILURE, (payload: F, meta?: M) => ({ payload, meta })),
  };
  const asyncTunk = createRequestAsyncThunk<R, S, M>(action.requset);
  return { ...action, asyncTunk };
};
