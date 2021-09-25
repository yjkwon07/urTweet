import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { CustomAxiosError } from '@typings/type';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { fetchStatusAction } from '../fetchStatus';
import { ActionMetaPayload, RequestCommonMeta } from './type';

type PromiseAction<R, S, M> = {
  payload: R;
  meta?: M;
  resolve?: (value: S) => void;
  reject?: (value: CustomAxiosError) => void;
};

export const createRequestSaga = <R, S, M extends RequestCommonMeta>(
  actionCreator: {
    TYPE: string;
    request: ActionMetaPayload<R, M | undefined>;
    success: ActionMetaPayload<S, M | undefined>;
    failure: ActionMetaPayload<AxiosResponse, M | undefined>;
  },
  requestCall: (...args: any[]) => any,
) => {
  return function* (action: PromiseAction<R, S, M>) {
    const actionList = action.meta?.actionList;
    try {
      yield put(fetchStatusAction.requestFetchStatus({ type: actionCreator.TYPE, actionList }));
      const { data }: AxiosResponse<S> = yield call(requestCall, action.payload);
      yield put(actionCreator.success);
      yield put(fetchStatusAction.successFetchStatus({ type: actionCreator.TYPE, data, actionList }));
      if (action.resolve) {
        yield call(action.resolve, data);
      }
    } catch (error) {
      if (isCustomAxiosError(error)) {
        yield put(actionCreator.failure(error.response.data, action.meta));
        yield put(
          fetchStatusAction.failureFetchStatus({ type: actionCreator.TYPE, data: error.response.data, actionList }),
        );
        if (action.reject) {
          yield call(action.reject, error);
        }
      }
    }
  };
};
