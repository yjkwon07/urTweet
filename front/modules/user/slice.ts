import { createSlice } from '@reduxjs/toolkit';

import { createRequestAsyncThunk } from '@modules/helper';
import { createRequestAction } from '@modules/helper/createRequestAction';

import { IMyUser, ISignup } from './typings/db';
import { ILoginBodyQuery, ISignupBodyQuery } from './typings/type';

export const USER = 'USER';

// Action
export const requsetLogin = createRequestAction<ILoginBodyQuery, IMyUser>(`${USER}/login`);

export const requestSignup = createRequestAction<ISignupBodyQuery, ISignup>(`${USER}/signup`);
export const requestAsyncSignup = createRequestAsyncThunk<ISignupBodyQuery, ISignup>(requestSignup.requset);

// Type
export interface IState {
  MyInfo: IMyUser | null;
}

// Reducer
const initialState: IState = {
  MyInfo: null,
};

const slice = createSlice({
  name: USER,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(requsetLogin.success, (state, { payload: data }) => {
        state.MyInfo = data;
      })
      .addDefaultCase(() => {}),
});

export const userReducer = slice.reducer;
export const userAction = slice.actions;
