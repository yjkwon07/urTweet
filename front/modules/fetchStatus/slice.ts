import { createAction, createSlice } from '@reduxjs/toolkit';

// Type
export interface IFetchStatusActionPayload {
  type: string;
  actionList?: any[];
  data?: any;
}

export type FetchStatus = 'INIT' | 'LOADING' | 'SUCCESS' | 'FAIL';

export interface IFetchStatusState {
  [type: string]: {
    status: FetchStatus;
    actionList: any[];
    data?: any;
  };
}

// Name
export const FETCH_STATUS = 'FETCH_STATUS';

// Action
export const initFetchStatus = createAction<Pick<IFetchStatusActionPayload, 'type'>>(`${FETCH_STATUS}/init`);
export const requestFetchStatus = createAction<IFetchStatusActionPayload>(`${FETCH_STATUS}/request`);
export const successFetchStatus = createAction<IFetchStatusActionPayload>(`${FETCH_STATUS}/success`);
export const failureFetchStatus = createAction<IFetchStatusActionPayload>(`${FETCH_STATUS}/fail`);

// Reducer
const initialState: IFetchStatusState = {};
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
export const fetchStatusAction = slice.actions;
