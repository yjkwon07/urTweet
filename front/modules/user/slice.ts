import { createSlice } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper/createRequestAction';

import { IMyUser, IUser } from './@types/db';
import {
  IFollowRes,
  IListReadFollowingURL,
  ILoginBodyQuery,
  IModifyNickNameBodyQuery,
  IModifyNickNameRes,
  IRemoveFollowerMeRes,
  ISignupBodyQuery,
  ISignupRes,
  IUnFollowRes,
  IUserURL,
} from './@types/query';

export const USER = 'USER';

// Action
export const login = createRequestAction<ILoginBodyQuery, IMyUser>(`${USER}/login`);
export const logout = createRequestAction<void, void>(`${USER}/logout`);
export const signup = createRequestAction<ISignupBodyQuery, ISignupRes>(`${USER}/signup`);
export const readMyUser = createRequestAction<void, IMyUser>(`${USER}/readMyUser`);
export const readUser = createRequestAction<IUserURL, IUser>(`${USER}/readUser`);
export const modifyNickname = createRequestAction<IModifyNickNameBodyQuery, IModifyNickNameRes>(
  `${USER}/modifyNickname`,
);
export const listReadFollow = createRequestAction<IListReadFollowingURL, IUser[]>(`${USER}/listReadFollow`);
export const listReadFollowing = createRequestAction<IListReadFollowingURL, IUser[]>(`${USER}/listReadFollowing`);
export const follow = createRequestAction<IUserURL, IFollowRes>(`${USER}/follow`);
export const unFollow = createRequestAction<IUserURL, IUnFollowRes>(`${USER}/unFollow`);
export const removeFollowerMe = createRequestAction<IUserURL, IRemoveFollowerMeRes>(`${USER}/removeFollowerMe`);

// Type
export interface IState {
  MyInfo: IMyUser | null;
  user: IUser | null;
}

// Reducer
const initialState: IState = {
  MyInfo: null,
  user: null,
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
      .addCase(readUser.success, (state, { payload: data }) => {
        state.user = data;
      })
      .addCase(modifyNickname.success, (state, { payload: data }) => {
        if (state.MyInfo) state.MyInfo.nickname = data.nickname;
      })
      .addCase(listReadFollow.success, (state, { payload: data }) => {
        if (state.MyInfo) state.MyInfo.Followers = data;
      })
      .addCase(listReadFollowing.success, (state, { payload: data }) => {
        if (state.MyInfo) state.MyInfo.Followings = data;
      })
      .addCase(follow.success, (state, { payload: data }) => {
        if (state.MyInfo) state.MyInfo.Followings.push({ id: data.UserId });
      })
      .addCase(unFollow.success, (state, { payload: data }) => {
        if (state.MyInfo) state.MyInfo.Followings = state.MyInfo.Followings.filter((_) => _.id !== data.UserId);
      })
      .addCase(removeFollowerMe.success, (state, { payload: data }) => {
        if (state.MyInfo) state.MyInfo.Followers = state.MyInfo.Followers.filter((_) => _.id !== data.UserId);
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
