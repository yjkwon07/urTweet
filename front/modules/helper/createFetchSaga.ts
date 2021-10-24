import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { CustomAxiosError } from '@typings/type';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { fetchStatusAction } from '../fetchStatus';
import { FetchAction, PromiseAction, RequestCommonMeta } from './type';

export const createFetchSaga = <R, S, F, M extends RequestCommonMeta>(
  fetchAction: FetchAction<R, S, F, M>,
  requestCall: (query: R | never) => Promise<AxiosResponse<S>>,
  successCall?: (data: S) => void,
  failureCall?: (error: CustomAxiosError<F>) => void,
) => {
  return function* (action: PromiseAction<R, S, F, M>) {
    const actionList = action.meta?.actionList;
    try {
      yield put(fetchStatusAction.requestFetchStatus({ type: fetchAction.TYPE, actionList }));
      const { data }: AxiosResponse<S> = yield call(requestCall, action.payload);
      yield put(fetchAction.success(data, action.meta));
      yield put(fetchStatusAction.successFetchStatus({ type: fetchAction.TYPE, response: data, actionList }));
      if (successCall) {
        yield call(successCall, data);
      }
      if (action.resolve) {
        action.resolve(data);
      }
    } catch (error) {
      if (isCustomAxiosError(error)) {
        const { data }: AxiosResponse<F> = error.response;
        yield put(fetchAction.failure(data, action.meta));
        yield put(fetchStatusAction.failureFetchStatus({ type: fetchAction.TYPE, response: error, actionList }));
        if (failureCall) {
          yield call(failureCall, error);
        }
        if (action.reject) {
          action.reject(error);
        }
      }
    }
  };
};
