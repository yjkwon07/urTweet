import { createSlice } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper/createRequestAction';

import { IMyUser, ISignupRes } from './@types/db';
import { ILoginBodyQuery, ISignupBodyQuery } from './@types/query';

export const USER = 'USER';

// Action
export const login = createRequestAction<ILoginBodyQuery, IMyUser>(`${USER}/login`);
export const logout = createRequestAction(`${USER}/logout`);
export const signup = createRequestAction<ISignupBodyQuery, ISignupRes>(`${USER}/signup`);
export const readMyUser = createRequestAction<void, IMyUser>(`${USER}/readMyUser`);
export const follow = createRequestAction<any, any>(`${USER}/follow`);
export const unFollow = createRequestAction<any, any>(`${USER}/unFollow`);

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
      .addCase(readMyUser.success, (state, { payload: data }) => {
        state.MyInfo = data;
      })
      .addCase(login.success, (state, { payload: data }) => {
        state.MyInfo = data;
      })
      .addCase(logout.success, (state) => {
        state.MyInfo = null;
      })
      .addDefaultCase(() => {}),
});

export const userReducer = slice.reducer;
export const userAction = slice.actions;
