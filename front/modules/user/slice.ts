import { createAction, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import _remove from 'lodash/remove';

import { createFetchAction } from '@modules/helper';

import { MyUser, User } from './@types/db';
import {
  FollowRes,
  FollowUrlQuery,
  ListReadFollowingRes,
  ListReadFollowingUrlQuery,
  ListReadFollowRes,
  ListReadFollowUrlQuery,
  LoginBodyQuery,
  LoginRes,
  LogoutRes,
  ReadMyUserRes,
  ReadUserRes,
  ReadUserUrlQuery,
  RemoveFollowerMeRes,
  RemoveFollowerMeUrlQuery,
  SignupBodyQuery,
  SignupRes,
  UnFollowRes,
  UnFollowUrlQuery,
  UpdateMyUserBodyQuery,
  UpdateMyUserRes,
} from './api';

export const USER = 'USER';

// Action - API
const fetchLogin = createFetchAction<LoginBodyQuery, LoginRes>(`${USER}/fetchLogin`);
const fetchLogout = createFetchAction<void, LogoutRes>(`${USER}/fetchLogout`);
const fetchSignup = createFetchAction<SignupBodyQuery, SignupRes>(`${USER}/fetchSignup`);
const fetchReadMyUser = createFetchAction<void, ReadMyUserRes>(`${USER}/fetchReadMyUser`);
const fetchReadUser = createFetchAction<ReadUserUrlQuery, ReadUserRes>(`${USER}/fetchReadUser`);
const fetchUpdateMyUser = createFetchAction<UpdateMyUserBodyQuery, UpdateMyUserRes>(`${USER}/fetchUpdateMyUser`);
const fetchListReadFollow = createFetchAction<ListReadFollowUrlQuery, ListReadFollowRes>(`${USER}/fetchListReadFollow`);
const fetchListReadFollowing = createFetchAction<ListReadFollowingUrlQuery, ListReadFollowingRes>(
  `${USER}/fetchListReadFollowing`,
);
const fetchFollow = createFetchAction<FollowUrlQuery, FollowRes>(`${USER}/fetchFollow`);
const fetchUnFollow = createFetchAction<UnFollowUrlQuery, UnFollowRes>(`${USER}/fetchUnFollow`);
const fetchRemoveFollowerMe = createFetchAction<RemoveFollowerMeUrlQuery, RemoveFollowerMeRes>(
  `${USER}/fetchRemoveFollowerMe`,
);

// Action
const myInfoReset = createAction(`${USER}/myInfoReset`);
const updateMyInfo = createAction<MyUser>(`${USER}/updateMyInfo`);
const addPostToMe = createAction<number>(`${USER}/addPostToMe`);
const removePostToMe = createAction<number>(`${USER}/removePostToMe`);
const changeSelectId = createAction<number>(`${USER}/changeSelectId`);

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
  selectId: number | null;
  myInfo: MyUser | null;
  user: User | null;
  followerListData: EntityState<User>;
  followingListData: EntityState<User>;
}

// Reducer
const initialState: UserState = {
  selectId: null,
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
      .addCase(changeSelectId, (state, { payload }) => {
        state.selectId = payload;
      })
      .addCase(myInfoReset, (state) => {
        state.myInfo = initialState.myInfo;
      })
      .addCase(updateMyInfo, (state, { payload }) => {
        state.myInfo = payload;
      })
      .addCase(fetchReadMyUser.success, (state, { payload: { resData } }) => {
        const { item } = resData;
        state.myInfo = item;
      })
      .addCase(fetchReadUser.success, (state, { payload: { resData } }) => {
        const { item } = resData;
        state.user = item;
      })
      .addCase(fetchUpdateMyUser.success, (state, { payload: { resData } }) => {
        const { email, nickname } = resData;
        if (state.myInfo) {
          state.myInfo.email = email;
          state.myInfo.nickname = nickname;
        }
      })
      .addCase(fetchListReadFollow.success, (state, { payload: { resData } }) => {
        const { list } = resData;
        followerListDataAdapter.addMany(state.followerListData, list);
      })
      .addCase(fetchListReadFollowing.success, (state, { payload: { resData } }) => {
        const { list } = resData;
        followingListDataAdapter.addMany(state.followingListData, list);
      })
      .addCase(fetchFollow.success, (state, { payload: { resData } }) => {
        const { userId } = resData;
        if (state.myInfo) state.myInfo.Followings.push({ id: userId });
      })
      .addCase(fetchUnFollow.success, (state, { payload: { resData } }) => {
        const { userId } = resData;
        if (state.myInfo) _remove(state.myInfo.Followings, { id: userId });
      })
      .addCase(fetchRemoveFollowerMe.success, (state, { payload: { resData } }) => {
        const { userId } = resData;
        if (state.myInfo) _remove(state.myInfo.Followers, { id: userId });
      })
      .addCase(addPostToMe, (state, { payload: id }) => {
        if (state.myInfo) state.myInfo.Posts.unshift({ id });
      })
      .addCase(removePostToMe, (state, { payload: id }) => {
        if (state.myInfo) _remove(state.myInfo.Posts, { id });
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
  state: (state: RootState) => state.USER,
  myData: (state: RootState) => state.USER.myInfo,
  userData: (state: RootState) => state.USER.user,
  followListData,
  followingListData,
};
export const userAction = {
  ...slice.actions,
  changeSelectId,
  myInfoReset,
  updateMyInfo,
  addPostToMe,
  removePostToMe,
  fetchReadMyUser,
  fetchReadUser,
  fetchUpdateMyUser,
  fetchListReadFollow,
  fetchListReadFollowing,
  fetchFollow,
  fetchUnFollow,
  fetchRemoveFollowerMe,
  fetchLogin,
  fetchLogout,
  fetchSignup,
};
