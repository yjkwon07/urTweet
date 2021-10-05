import { createAction, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import _remove from 'lodash/remove';

import { createRequestAction } from '@modules/helper';

import { MyUser, User } from './@types/db';
import {
  requestFollow,
  requestListReadFollow,
  requestListReadFollowing,
  requestLogin,
  requestLogout,
  requestUpdateNickname,
  requestReadMyUser,
  requestReadUser,
  requestRemoveFollowerMe,
  requestSignup,
  requestUnfollow,
} from './api';

export const USER = 'USER';

// Action - API
export const login = createRequestAction(`${USER}/login`, requestLogin);
export const logout = createRequestAction(`${USER}/logout`, requestLogout);
export const signup = createRequestAction(`${USER}/signup`, requestSignup);
export const readMyUser = createRequestAction(`${USER}/readMyUser`, requestReadMyUser);
export const readUser = createRequestAction(`${USER}/readUser`, requestReadUser);
export const updateNickname = createRequestAction(`${USER}/updateNickname`, requestUpdateNickname);
export const listReadFollow = createRequestAction(`${USER}/listReadFollow`, requestListReadFollow);
export const listReadFollowing = createRequestAction(`${USER}/listReadFollowing`, requestListReadFollowing);
export const follow = createRequestAction(`${USER}/follow`, requestFollow);
export const unFollow = createRequestAction(`${USER}/unFollow`, requestUnfollow);
export const removeFollowerMe = createRequestAction(`${USER}/removeFollowerMe`, requestRemoveFollowerMe);

// Action
export const addPostToMe = createAction<number>(`${USER}/addPostToMe`);
export const removePostToMe = createAction<number>(`${USER}/removePostToMe`);

// Entity
const followerListDataAdapter = createEntityAdapter<User>({
  selectId: (data) => data.id,
});
const followingListDataAdapter = createEntityAdapter<User>({
  selectId: (data) => data.id,
});

// Type
export type PostState = EntityState<User>;

// Type
export interface UserState {
  myInfo: MyUser | null;
  user: User | null;
  followerListData: EntityState<User>;
  followingListData: EntityState<User>;
}

// Reducer
const initialState: UserState = {
  myInfo: null,
  user: null,
  followerListData: followerListDataAdapter.getInitialState(),
  followingListData: followingListDataAdapter.getInitialState(),
};

const slice = createSlice({
  name: USER,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(readMyUser.success, (state, { payload: { resData } }) => {
        const { item } = resData;
        state.myInfo = item;
      })
      .addCase(readUser.success, (state, { payload: { resData } }) => {
        const { item } = resData;
        state.user = item;
      })
      .addCase(updateNickname.success, (state, { payload: { resData } }) => {
        const { nickname } = resData;
        if (state.myInfo) state.myInfo.nickname = nickname;
      })
      .addCase(listReadFollow.success, (state, { payload: { resData } }) => {
        const { list } = resData;
        followerListDataAdapter.addMany(state.followerListData, list);
      })
      .addCase(listReadFollowing.success, (state, { payload: { resData } }) => {
        const { list } = resData;
        followingListDataAdapter.addMany(state.followingListData, list);
      })
      .addCase(follow.success, (state, { payload: { resData } }) => {
        const { userId } = resData;
        if (state.myInfo) state.myInfo.Followings.push({ id: userId });
      })
      .addCase(unFollow.success, (state, { payload: { resData } }) => {
        const { userId } = resData;
        if (state.myInfo) _remove(state.myInfo.Followings, { id: userId });
      })
      .addCase(removeFollowerMe.success, (state, { payload: { resData } }) => {
        const { userId } = resData;
        if (state.myInfo) _remove(state.myInfo.Followers, { id: userId });
      })
      .addCase(addPostToMe, (state, { payload: id }) => {
        if (state.myInfo) state.myInfo.Posts.unshift({ id });
      })
      .addCase(removePostToMe, (state, { payload: id }) => {
        if (state.myInfo) _remove(state.myInfo.Posts, { id });
      })
      .addCase(login.success, (state, { payload: { resData } }) => {
        state.myInfo = resData;
      })
      .addCase(logout.success, (state) => {
        state.myInfo = null;
      }),
});

const { selectAll: followListData } = followerListDataAdapter.getSelectors(
  (state: RootState) => state.USER.followerListData,
);
const { selectAll: followingListData } = followingListDataAdapter.getSelectors(
  (state: RootState) => state.USER.followingListData,
);

export const userReducer = slice.reducer;
export const userSelector = {
  myData: (state: RootState) => state.USER.myInfo,
  userData: (state: RootState) => state.USER.user,
  followListData,
  followingListData,
};
export const userAction = {
  ...slice.actions,
  readMyUser,
  readUser,
  updateNickname,
  listReadFollow,
  listReadFollowing,
  follow,
  unFollow,
  removeFollowerMe,
  addPostToMe,
  removePostToMe,
  login,
  logout,
};
