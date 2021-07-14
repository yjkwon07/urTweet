import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { request, success, fail } from '../fetchStatus';
import { ActionMetaPayload, Meta } from './type';

type IPromiseAction<R, S, F, M> = {
  payload: R;
  meta?: M;
  resolve?: (value: S) => void;
  reject?: (value: F) => void;
};

export const createRequestSaga = <R, S, F, M extends Meta>(
  actionCreator: {
    TYPE: string;
    request: ActionMetaPayload<R, M | undefined>;
    success: ActionMetaPayload<S, M | undefined>;
    failure: ActionMetaPayload<F, M | undefined>;
  },
  requestCall: any,
) => {
  return function* (action: IPromiseAction<R, S, F, M>) {
    const actionList = action.meta?.actionList || [];
    try {
      yield put(request({ type: actionCreator.TYPE, data: { actionList } }));
      const { data }: AxiosResponse<S> = yield call(requestCall, action.payload);
      yield put(actionCreator.success(data, action.meta));
      yield put(success({ type: actionCreator.TYPE, data: { result: data, actionList } }));
      if (action.resolve) {
        yield call(action.resolve, data);
      }
    } catch (error) {
      if (!error.response?.data) error.response = { data: '네트워크 오류' };
      yield put(actionCreator.failure(error, action.meta));
      yield put(fail({ type: actionCreator.TYPE, data: { result: error, actionList } }));
      if (action.reject) {
        yield call(action.reject, error);
      }
    }
  };
};
