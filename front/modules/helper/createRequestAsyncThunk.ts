import { Dispatch } from '@reduxjs/toolkit';

import { ActionMetaPayload } from './type';

export const createRequestAsyncThunk = <R, S, M>(action: ActionMetaPayload<R, M>) => {
  return (payload: R, meta?: M) => (dispatch: Dispatch) => {
    return new Promise<S>((resolve, reject) => {
      dispatch({ ...action(payload, meta), resolve, reject });
    });
  };
};
