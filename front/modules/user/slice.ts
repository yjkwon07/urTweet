import { createAction, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import _remove from 'lodash/remove';

import { createFetchAction } from '@modules/helper';

import { MyUser, User } from './@types/db';
import {
  FollowRes,
  FollowUrlQuery,
  ListReadFollowingRes,
  ListReadFollowingUrlQuery,
  ListReadFollowerRes,
  ListReadFollowerUrlQuery,
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
const fetchListReadFollower = createFetchAction<ListReadFollowerUrlQuery, ListReadFollowerRes>(
  `${USER}/fetchListReadFollower`,
);
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

// Entity
const followerListDataAdapter = createEntityAdapter<User>({
  selectId: (data) => data.id,
});
const followingListDataAdapter = createEntityAdapter<User>({
  selectId: (data) => data.id,
});

// Type
export interface FollowerState extends EntityState<User> {
  curPage: number;
  rowsPerPage: number;
  isMoreRead: boolean;
  totalCount: number;
}

export interface FollowingState extends EntityState<User> {
  curPage: number;
  rowsPerPage: number;
  isMoreRead: boolean;
  totalCount: number;
}

export interface UserState {
  myInfo: MyUser | null;
  user: User | null;
  follower: FollowerState;
  following: FollowingState;
}

// Reducer
const initialState: UserState = {
  myInfo: null,
  user: null,
  follower: followerListDataAdapter.getInitialState({
    curPage: 0,
    rowsPerPage: 0,
    isMoreRead: false,
    totalCount: 0,
  }),
  following: followingListDataAdapter.getInitialState({
    curPage: 0,
    rowsPerPage: 0,
    isMoreRead: false,
    totalCount: 0,
  }),
};

const slice = createSlice({
  name: USER,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
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
      .addCase(fetchListReadFollower.success, (state, { payload: { resData } }) => {
        const { list, curPage, rowsPerPage, totalCount, nextPage } = resData;
        state.follower.curPage = curPage;
        state.follower.rowsPerPage = rowsPerPage;
        state.follower.totalCount = totalCount;
        state.follower.isMoreRead = !!nextPage;
        followerListDataAdapter.addMany(state.follower, list);
      })
      .addCase(fetchListReadFollowing.success, (state, { payload: { resData } }) => {
        const { list, curPage, rowsPerPage, totalCount, nextPage } = resData;
        state.following.curPage = curPage;
        state.following.rowsPerPage = rowsPerPage;
        state.following.totalCount = totalCount;
        state.following.isMoreRead = !!nextPage;
        followingListDataAdapter.addMany(state.following, list);
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

const { selectAll: followerListData } = followerListDataAdapter.getSelectors((state: RootState) => state.USER.follower);
const { selectAll: followingListData } = followingListDataAdapter.getSelectors(
  (state: RootState) => state.USER.following,
);

export const userReducer = slice.reducer;
export const userSelector = {
  state: (state: RootState) => state.USER,
  myData: (state: RootState) => state.USER.myInfo,
  userData: (state: RootState) => state.USER.user,
  followerListData,
  follower: (state: RootState) => state.USER.follower,
  followingListData,
  following: (state: RootState) => state.USER.following,
};
export const userAction = {
  ...slice.actions,
  myInfoReset,
  updateMyInfo,
  addPostToMe,
  removePostToMe,
  fetchReadMyUser,
  fetchReadUser,
  fetchUpdateMyUser,
  fetchListReadFollower,
  fetchListReadFollowing,
  fetchFollow,
  fetchUnFollow,
  fetchRemoveFollowerMe,
  fetchLogin,
  fetchLogout,
  fetchSignup,
};
