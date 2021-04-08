import { call, put } from 'redux-saga/effects';

import { request, success, fail } from '../fetchStatus';
import { ActionMetaPayload } from './type';

interface IPromiseAction<T, R, M> {
  payload: T;
  meta?: M;
  resolve?: (value: R, meta?: M) => void;
  reject?: (value: any, meta?: M) => void;
}

export const createRequestSaga = <R, S, F, M>(
  asyncActionCreator: {
    TYPE: string;
    requset: ActionMetaPayload<R, M>;
    success: ActionMetaPayload<S, M>;
    failure: ActionMetaPayload<F, M>;
  },
  requestCall: any,
) => {
  return function* (action: IPromiseAction<R, S, M>) {
    try {
      yield put(request({ type: asyncActionCreator.TYPE }));
      const result: S = yield call(requestCall, action.payload);
      yield put(asyncActionCreator.success(result));
      yield put(success({ type: asyncActionCreator.TYPE, data: result }));
      if (action.resolve) action.resolve(result, action.meta);
    } catch (error) {
      yield put(asyncActionCreator.failure(error));
      yield put(fail({ type: asyncActionCreator.TYPE, data: error }));
      if (action.reject) action.reject(error, action.meta);
    }
  };
};
