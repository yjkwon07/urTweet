import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { request, success, fail } from '../fetchStatus';
import { ActionMetaPayload } from './type';

interface IPromiseAction<R, S, F, M> {
  payload: R;
  meta?: M;
  resolve?: (value: S) => void;
  reject?: (value: F) => void;
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
  return function* (action: IPromiseAction<R, S, F, M>) {
    try {
      yield put(request({ type: asyncActionCreator.TYPE }));
      const { data }: AxiosResponse<S> = yield call(requestCall, action.payload);
      yield put(asyncActionCreator.success(data, action.meta));
      yield put(success({ type: asyncActionCreator.TYPE, data }));
      if (action.resolve) {
        yield call(action.resolve, data);
      }
    } catch (error) {
      if (!error.response?.data) error.response = { data: '네트워크 오류' };
      yield put(asyncActionCreator.failure(error, action.meta));
      yield put(fail({ type: asyncActionCreator.TYPE, data: error }));
      if (action.reject) {
        yield call(action.reject, error);
      }
    }
  };
};
