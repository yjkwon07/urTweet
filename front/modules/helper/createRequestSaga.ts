import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { CustomAxiosError } from '@typings/type';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { fetchStatusAction } from '../fetchStatus';
import { ActionMetaPayload, RequestCommonMeta } from './type';

type PromiseAction<R, S, F, M> = {
  payload: R;
  meta?: M;
  resolve?: (value: S) => void;
  reject?: (value: CustomAxiosError<F>) => void;
};

export const createRequestSaga = <R, S, F, M extends RequestCommonMeta>(
  requestAction: {
    TYPE: string;
    success: ActionMetaPayload<S, M>;
    failure: ActionMetaPayload<F, M>;
  },
  requestCall: (...args: any[]) => any,
) => {
  return function* (action: PromiseAction<R, S, F, M>) {
    const actionList = action.meta?.actionList;
    try {
      yield put(fetchStatusAction.requestFetchStatus({ type: requestAction.TYPE, actionList }));
      const { data }: AxiosResponse<S> = yield call(requestCall, action.payload);
      yield put(requestAction.success(data, action.meta));
      yield put(fetchStatusAction.successFetchStatus({ type: requestAction.TYPE, response: data, actionList }));
      if (action.resolve) {
        action.resolve(data);
      }
    } catch (error) {
      if (isCustomAxiosError(error)) {
        const { data }: AxiosResponse<F> = error.response;
        yield put(requestAction.failure(data, action.meta));
        yield put(fetchStatusAction.failureFetchStatus({ type: requestAction.TYPE, response: data, actionList }));
        if (action.reject) {
          action.reject(error);
        }
      }
    }
  };
};
