import { createSlice } from '@reduxjs/toolkit';

import { createRequestAsyncThunk } from '@modules/helper';
import { createRequestAction } from '@modules/helper/createRequestAction';

import { ISignup } from './typings/db';
import { ILoginBodyQuery, ISignupBodyQuery } from './typings/type';

export const USER = 'USER';

// Action
export const requsetLogin = createRequestAction<ILoginBodyQuery, ISignup>(`${USER}/login`);

export const requestSignup = createRequestAction<ISignupBodyQuery, ISignup>(`${USER}/signup`);
export const requestAsyncSignup = createRequestAsyncThunk<ISignupBodyQuery, ISignup>(requestSignup.requset);

// Type
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUser {}

// Reducer
const initialState: IUser = {};

const slice = createSlice({
  name: USER,
  initialState,
  reducers: {},
});

export const userReducer = slice.reducer;
export const userAction = slice.actions;
