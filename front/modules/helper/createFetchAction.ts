import { createAction } from '@reduxjs/toolkit';

import { createRequestAsyncThunk } from './createRequestAsyncThunk';
import { RequestCommonMeta } from './type';

export const createFetchAction = <
  R,
  S,
  F extends ErrorCommonRes = ErrorCommonRes,
  M extends RequestCommonMeta = RequestCommonMeta,
>(
  type: string,
) => {
  const REQUEST = `${type}/request`;
  const SUCCESS = `${type}/success`;
  const FAILURE = `${type}/failure`;

  const action = {
    TYPE: type,
    request: createAction(REQUEST, (payload: R, meta?: M) => ({ payload, meta })),
    success: createAction(SUCCESS, (payload: S, meta?: M) => ({ payload, meta })),
    failure: createAction(FAILURE, (payload: F, meta?: M) => ({ payload, meta })),
  };
  const asyncThunk = createRequestAsyncThunk<R, S, M>(action.request);
  return { ...action, asyncThunk };
};
