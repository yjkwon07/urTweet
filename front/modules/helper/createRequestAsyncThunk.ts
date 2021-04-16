import { Dispatch } from '@reduxjs/toolkit';

import { ActionMetaPayload } from './type';

export function createRequestAsyncThunk<P, R, M = any>(action: ActionMetaPayload<P, M | undefined>) {
  return (payload: P, meta?: M) => (dispatch: Dispatch) => {
    return new Promise<R>((resolve, reject) => {
      dispatch({ ...action(payload, meta), resolve, reject });
    });
  };
}
