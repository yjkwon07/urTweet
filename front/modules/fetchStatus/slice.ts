import { createAction, createSlice } from '@reduxjs/toolkit';

// Type
export type typePayload = {
  type: string;
  data: {
    actionList: any[];
    result?: any;
  };
};

export type FetchStatus = 'INIT' | 'LOADING' | 'SUCCESS' | 'FAIL';

export type FetchReducer = {
  [key: string]: {
    status: FetchStatus;
    actionList: any[];
    data?: any;
  };
};

// Name
export const FETCH_STATUS = 'FETCH_STATUS';

// Action
export const initFetch = createAction<typePayload>(`${FETCH_STATUS}/initFetch`);
export const request = createAction<typePayload>(`${FETCH_STATUS}/request`);
export const success = createAction<typePayload>(`${FETCH_STATUS}/success`);
export const fail = createAction<typePayload>(`${FETCH_STATUS}/fail`);

// Reducer
const initialState: FetchReducer = {};
const slice = createSlice({
  name: FETCH_STATUS,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(initFetch, (state, { payload: { type } }) => {
        state[type] = {
          status: 'INIT',
          actionList: [],
          data: null,
        };
      })
      .addCase(request, (state, { payload: { type, data } }) => {
        state[type] = {
          status: 'LOADING',
          actionList: state[type]?.actionList.concat(data.actionList) || data.actionList,
          data: null,
        };
      })
      .addCase(success, (state, { payload: { type, data } }) => {
        state[type] = {
          status: 'SUCCESS',
          actionList: state[type]?.actionList.filter((action) => !data.actionList.includes(action)) || [],
          data: data.result,
        };
      })
      .addCase(fail, (state, { payload: { type, data } }) => {
        state[type] = {
          status: 'FAIL',
          actionList: state[type]?.actionList.filter((action) => !data.actionList.includes(action)) || [],
          data: data.result,
        };
      })
      .addDefaultCase((state) => state),
});

export const fetchStatusReducer = slice.reducer;
export const fetchStatusAction = slice.actions;
