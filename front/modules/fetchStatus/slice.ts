import { createAction, createSlice } from '@reduxjs/toolkit';

// Type
export type ItypePayload = {
  type: string;
  data: {
    actionList: any[];
    result?: any;
  };
};

export type IFetchStatus = 'INIT' | 'LOADING' | 'SUCCESS' | 'FAIL';

export type IFetchReducer = {
  [key: string]: {
    status: IFetchStatus;
    actionList: any[];
    data?: any;
  };
};

// Name
export const FETCH_STATUS = 'FETCH_STATUS';

// Action
export const initFetch = createAction<ItypePayload>(`${FETCH_STATUS}/initFetch`);
export const request = createAction<ItypePayload>(`${FETCH_STATUS}/request`);
export const success = createAction<ItypePayload>(`${FETCH_STATUS}/success`);
export const fail = createAction<ItypePayload>(`${FETCH_STATUS}/fail`);

// Reducer
const initialState: IFetchReducer = {};
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
          actionList: state[type]?.actionList.filter((action) => data.actionList.indexOf(action) === -1) || [],
          data: data.result,
        };
      })
      .addCase(fail, (state, { payload: { type, data } }) => {
        state[type] = {
          status: 'FAIL',
          actionList: state[type]?.actionList.filter((action) => data.actionList.indexOf(action) === -1) || [],
          data: data.result,
        };
      })
      .addDefaultCase((state) => state),
});

export const fetchStatusReducer = slice.reducer;
export const fetchStatusAction = slice.actions;
