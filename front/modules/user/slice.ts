import { createAction, createSlice } from '@reduxjs/toolkit';
import _remove from 'lodash/remove';

import { createRequestAction } from '@modules/helper';

import { IMyUser, IUser } from './@types/db';
import {
  requestFollow,
  requestListReadFollow,
  requestListReadFollowing,
  requestLogin,
  requestLogout,
  requestModifyNickname,
  requestReadMyUser,
  requestReadUser,
  requestRemoveFollowerMe,
  requestSignup,
  requestUnfollow,
} from './api/requestAPI';

export const USER = 'USER';

// Action - API
export const login = createRequestAction(`${USER}/login`, requestLogin);
export const logout = createRequestAction(`${USER}/logout`, requestLogout);
export const signup = createRequestAction(`${USER}/signup`, requestSignup);
export const readMyUser = createRequestAction(`${USER}/readMyUser`, requestReadMyUser);
export const readUser = createRequestAction(`${USER}/readUser`, requestReadUser);
export const modifyNickname = createRequestAction(`${USER}/modifyNickname`, requestModifyNickname);
export const listReadFollow = createRequestAction(`${USER}/listReadFollow`, requestListReadFollow);
export const listReadFollowing = createRequestAction(`${USER}/listReadFollowing`, requestListReadFollowing);
export const follow = createRequestAction(`${USER}/follow`, requestFollow);
export const unFollow = createRequestAction(`${USER}/unFollow`, requestUnfollow);
export const removeFollowerMe = createRequestAction(`${USER}/removeFollowerMe`, requestRemoveFollowerMe);

// Action
export const addPostToMe = createAction<number>(`${USER}/addPostToMe`);
export const removePostToMe = createAction<number>(`${USER}/removePostToMe`);

// Type
export interface IState {
  MyInfo: IMyUser | null;
  user: IUser | null;
  followerListData: IUser[];
  followingListData: IUser[];
}

// Reducer
const initialState: IState = {
  MyInfo: null,
  user: null,
  followerListData: [],
  followingListData: [],
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
      .addCase(modifyNickname.success, (state, { payload: { nickname } }) => {
        if (state.MyInfo) state.MyInfo.nickname = nickname;
      })
      .addCase(listReadFollow.success, (state, { payload: data }) => {
        state.followerListData = data;
      })
      .addCase(listReadFollowing.success, (state, { payload: data }) => {
        state.followingListData = data;
      })
      .addCase(follow.success, (state, { payload: { UserId } }) => {
        if (state.MyInfo) state.MyInfo.Followings.push({ id: UserId });
      })
      .addCase(unFollow.success, (state, { payload: { UserId } }) => {
        if (state.MyInfo) _remove(state.MyInfo.Followings, { id: UserId });
      })
      .addCase(removeFollowerMe.success, (state, { payload: { UserId } }) => {
        if (state.MyInfo) _remove(state.MyInfo.Followers, { id: UserId });
      })
      .addCase(addPostToMe, (state, { payload: id }) => {
        if (state.MyInfo) state.MyInfo.Posts.unshift({ id });
      })
      .addCase(removePostToMe, (state, { payload: id }) => {
        if (state.MyInfo) _remove(state.MyInfo.Posts, { id });
      })
      .addCase(login.success, (state, { payload: data }) => {
        state.MyInfo = data;
      })
      .addCase(logout.success, (state) => {
        state.MyInfo = null;
      })
      .addDefaultCase((state) => state),
});

// Select
export const userSelector = {
  myData: (state: RootState) => state.USER.MyInfo,
  userData: (state: RootState) => state.USER.user,
  followListData: (state: RootState) => state.USER.followerListData,
  followingListData: (state: RootState) => state.USER.followingListData,
};

export const userReducer = slice.reducer;
export const userAction = slice.actions;
