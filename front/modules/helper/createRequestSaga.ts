import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { requestFetchStatus, successFetchStatus, failureFetchStatus } from '../fetchStatus';
import { ActionMetaPayload, RequestCommonMeta } from './type';

type IPromiseAction<R, S, F, M> = {
  payload: R;
  meta?: M;
  resolve?: (value: S) => void;
  reject?: (value: F) => void;
};

export const createRequestSaga = <R, S, F, M extends RequestCommonMeta>(
  actionCreator: {
    TYPE: string;
    request: ActionMetaPayload<R, M | undefined>;
    success: ActionMetaPayload<S, M | undefined>;
    failure: ActionMetaPayload<F, M | undefined>;
  },
  requestCall: (...args: any[]) => any,
) => {
  return function* (action: IPromiseAction<R, S, F, M>) {
    const actionList = action.meta?.actionList || [];
    try {
      yield put(requestFetchStatus({ type: actionCreator.TYPE, actionList }));
      const { data }: AxiosResponse<S> = yield call(requestCall, action.payload);
      yield put(actionCreator.success(data, action.meta));
      yield put(successFetchStatus({ type: actionCreator.TYPE, data, actionList }));
      if (action.resolve) {
        yield call(action.resolve, data);
      }
    } catch (error) {
      if (!error.response?.data) error.response = { data: '네트워크 오류' };
      yield put(actionCreator.failure(error, action.meta));
      yield put(failureFetchStatus({ type: actionCreator.TYPE, data: error, actionList }));
      if (action.reject) {
        yield call(action.reject, error);
      }
    }
  };
};
