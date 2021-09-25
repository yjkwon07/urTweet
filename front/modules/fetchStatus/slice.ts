import { createAction, createSlice } from '@reduxjs/toolkit';

// Type
export interface FetchStatusActionPayload {
  type: string;
  actionList?: any[];
  data?: any;
}

export type FetchStatus = 'INIT' | 'LOADING' | 'SUCCESS' | 'FAIL';

export interface FetchStatusState {
  [type: string]: {
    status: FetchStatus;
    actionList: any[];
    data?: any;
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
        };
      })
      .addCase(requestFetchStatus, (state, { payload: { type, actionList = [] } }) => {
        state[type] = {
          status: 'LOADING',
          actionList: state[type]?.actionList.concat(actionList) || actionList,
          data: null,
        };
      })
      .addCase(successFetchStatus, (state, { payload: { type, actionList = [], data } }) => {
        state[type] = {
          status: 'SUCCESS',
          actionList: state[type]?.actionList.filter((action) => !actionList?.includes(action)) || [],
          data,
        };
      })
      .addCase(failureFetchStatus, (state, { payload: { type, actionList = [], data } }) => {
        state[type] = {
          status: 'FAIL',
          actionList: state[type]?.actionList.filter((action) => !actionList?.includes(action)) || [],
          data,
        };
      })
      .addDefaultCase((state) => state),
});

export const fetchStatusReducer = slice.reducer;
export const fetchStatusAction = {
  ...slice.actions,
  initFetchStatus,
  requestFetchStatus,
  successFetchStatus,
  failureFetchStatus,
};
