import { createAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { createRequestAsyncThunk } from './createRequestAsyncThunk';
import { RequestCommonMeta } from './type';

export const createRequestAction = <R, S, M extends RequestCommonMeta>(
  type: string,
  requestAPI: (query: R) => Promise<AxiosResponse<S>>,
) => {
  const REQUEST = `${type}/request`;
  const SUCCESS = `${type}/success`;
  const FAILURE = `${type}/fail`;

  const action = {
    TYPE: type,
    request: createAction(REQUEST, (payload: R, meta?: M) => ({ payload, meta })),
    success: createAction(SUCCESS, (payload: S, meta?: M) => ({ payload, meta })),
    failure: createAction(FAILURE, (payload: AxiosResponse, meta?: M) => ({ payload, meta })),
    requestAPI,
  };
  const asyncThunk = createRequestAsyncThunk<R, S, M>(action.request);
  return { ...action, asyncThunk };
};
