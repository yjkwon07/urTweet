import { createAction, createSlice } from '@reduxjs/toolkit';

import { FetchAction } from '@modules/helper/type';
import { CustomAxiosError } from '@typings/type';

import { FetchStatusActionPayload } from './@types';

// Type
export type FetchStatus = 'INIT' | 'LOADING' | 'SUCCESS' | 'FAIL';

export interface FetchStatusState {
  [type: string]: {
    status: FetchStatus;
    actionList: any[];
    data?: any;
    error?: any;
  };
}

// Name
export const FETCH_STATUS = 'FETCH_STATUS';

// Action
const initFetchStatus = createAction<Pick<FetchStatusActionPayload, 'type'>>(`${FETCH_STATUS}/init`);
const requestFetchStatus = createAction<FetchStatusActionPayload>(`${FETCH_STATUS}/request`);
const successFetchStatus = createAction<FetchStatusActionPayload>(`${FETCH_STATUS}/success`);
const failureFetchStatus = createAction<FetchStatusActionPayload>(`${FETCH_STATUS}/fail`);

// Reducer
const initialState: FetchStatusState = {};
const slice = createSlice({
  name: FETCH_STATUS,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(initFetchStatus, (state, { payload: { type } }) => {
        state[type] = {
          status: 'INIT',
          actionList: [],
          data: null,
          error: null,
        };
      })
      .addCase(requestFetchStatus, (state, { payload: { type, actionList = [] } }) => {
        state[type] = {
          status: 'LOADING',
          actionList: state[type]?.actionList.concat(actionList) || actionList,
          data: state[type]?.data,
          error: state[type]?.error,
        };
      })
      .addCase(successFetchStatus, (state, { payload: { type, actionList = [], response } }) => {
        state[type] = {
          status: 'SUCCESS',
          actionList: state[type]?.actionList.filter((action) => !actionList?.includes(action)) || [],
          data: response,
          error: null,
        };
      })
      .addCase(failureFetchStatus, (state, { payload: { type, actionList = [], response } }) => {
        state[type] = {
          status: 'FAIL',
          actionList: state[type]?.actionList.filter((action) => !actionList?.includes(action)) || [],
          data: null,
          error: response,
        };
      })
      .addDefaultCase((state) => state),
});

export const fetchStatusReducer = slice.reducer;
export const fetchStatusSelector = {
  byType:
    <S = any, F = any>(type: string, actionId?: any) =>
    (state: RootState): { status: FetchStatus; data: S | null; error: F | null; actionList: any[] } => {
      let result = state.FETCH_STATUS[type] || {
        status: 'INIT',
        actionList: [],
        data: null,
        error: null,
      };
      if (actionId && !result.actionList.includes(actionId)) {
        result = { status: 'INIT', actionList: [], data: null, error: null };
      }
      return { status: result.status, actionList: result.actionList, data: result.data, error: result.error };
    },
  byFetchAction:
    <R, S, F, M>(fetchAction: FetchAction<R, S, F, M>, actionId?: any) =>
    (
      state: RootState,
    ): { status: FetchStatus; data: S | null; error: CustomAxiosError<F> | null; actionList: any[] } => {
      let result = state.FETCH_STATUS[fetchAction.TYPE] || {
        status: 'INIT',
        actionList: [],
        data: null,
        error: null,
      };
      if (actionId && !result.actionList.includes(actionId)) {
        result = { status: 'INIT', actionList: [], data: null, error: null };
      }
      return { status: result.status, actionList: result.actionList, data: result.data, error: result.error };
    },
};

export const fetchStatusAction = {
  ...slice.actions,
  initFetchStatus,
  requestFetchStatus,
  successFetchStatus,
  failureFetchStatus,
};
