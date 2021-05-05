import { createAction, createSlice } from '@reduxjs/toolkit';

// Type
interface ItypePayload {
  type: string;
  data?: any;
}

export interface IFetchReducer {
  [key: string]: {
    status?: 'LOADING' | 'SUCCESS' | 'FAIL';
    data?: any;
  };
}

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
          status: undefined,
          data: null,
        };
      })
      .addCase(request, (state, { payload: { type } }) => {
        state[type] = {
          status: 'LOADING',
          data: null,
        };
      })
      .addCase(success, (state, { payload: { type, data } }) => {
        state[type] = {
          status: 'SUCCESS',
          data,
        };
      })
      .addCase(fail, (state, { payload: { type, data } }) => {
        state[type] = {
          status: 'FAIL',
          data,
        };
      })
      .addDefaultCase(() => {}),
});

export const fetchStatusReducer = slice.reducer;
export const fetchStatusAction = slice.actions;
