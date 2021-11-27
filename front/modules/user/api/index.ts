import { axios } from '@modules/client';

import { MyUser, User } from '../@types/db';

/**
 * * 로그인 유저 정보 조회 GET
 * * url: /user
 * * body: empty
 * * res: MyUser
 */
export interface ReadMyUserResData {
  item: MyUser;
}
export interface ReadMyUserRes extends CommonRes {
  resData: ReadMyUserResData;
}
export const GET_READ_MY_USER_API_KEY = () => {
  return `/user`;
};
export const GET_READ_MY_USER_API = () => {
  return `${GET_READ_MY_USER_API_KEY()}`;
};
export const requestReadMyUser = () => {
  return axios.get<ReadMyUserRes>(GET_READ_MY_USER_API());
};

/**
 * * 유저 정보 조회 GET
 * * url: /user/:userId
 * * body: empty
 * * res: User
 */
export type ReadUserUrlQuery = {
  userId: number;
};
export interface ReadUserResData {
  item: User;
}
export interface ReadUserRes extends CommonRes {
  resData: ReadUserResData;
}
export const GET_READ_USER_API_KEY = () => {
  return `/user`;
};
export const GET_READ_USER_API = (url: ReadUserUrlQuery) => {
  return `${GET_READ_USER_API_KEY()}/${url.userId}`;
};
export const requestReadUser = (url: ReadUserUrlQuery) => {
  return axios.get<ReadUserRes>(GET_READ_USER_API(url));
};

/**
 * * 로그인 POST
 * * url: /user/login
 * * body: LoginBodyQuery
 * * res: MyUser
 */
export type LoginBodyQuery = {
  email: string;
  password: string;
};
export interface LoginRes extends CommonRes {
  resData: MyUser;
}
export const GET_LOGIN_API = () => {
  return `/user/login`;
};
export const requestLogin = (body: LoginBodyQuery) => {
  return axios.post<LoginRes>(GET_LOGIN_API(), body);
};

/**
 * * 로그아웃 POST
 * * url: /user/logout
 * * body: empty
 * * res: LogoutRes
 */
export interface LogoutRes extends CommonRes {
  resData: null;
}
export const GET_LOGOUT_API = () => {
  return `/user/logout`;
};
export const requestLogout = () => {
  return axios.post<LogoutRes>(GET_LOGOUT_API());
};

/**
 * * 유저 등록 POST
 * * url: /user
 * * body: SignupBodyQuery
 * * res: SignupRes
 */
export type SignupBodyQuery = {
  email: string;
  nickname: string;
  password: string;
};
export interface SignupRes extends CommonRes {
  resData: MyUser;
}
export const GET_SIGNUP_API = () => {
  return `/user`;
};
export const requestSignup = (body: SignupBodyQuery) => {
  return axios.post<SignupRes>(GET_SIGNUP_API(), body);
};

/**
 * * 내 정보 수정 PATCH
 * * url: /user
 * * body: UpdateMyUserBodyQuery
 * * res: UpdateMyUserRes
 */
export type UpdateMyUserBodyQuery = {
  email: string;
  nickname: string;
};
export interface UpdateMyUserResData {
  email: string;
  nickname: string;
}
export interface UpdateMyUserRes extends CommonRes {
  resData: UpdateMyUserResData;
}
export const GET_UPDATE_MY_USER_API = () => {
  return `/user`;
};
export const requestUpdateMyUser = (body: UpdateMyUserBodyQuery) => {
  return axios.patch<UpdateMyUserRes>(GET_UPDATE_MY_USER_API(), body);
};

/**
 * * 내가 팔로우 하는 유저 목록 조회 GET
 * * url: /user/followings?page=:page&pageSize=:pageSize
 * * body: empty
 * * res: ListReadFollowingRes
 */
export type ListReadFollowingUrlQuery = {
  page: number;
  pageSize: number;
};
export interface ListReadFollowingResData extends ListReadCommonRes {
  list: User[];
}
export interface ListReadFollowingRes extends CommonRes {
  resData: ListReadFollowingResData;
}
export const GET_LIST_READ_FOLLOWING_API_KEY = () => {
  return `/user`;
};
export const GET_LIST_READ_FOLLOWING_API = (url: ListReadFollowingUrlQuery) => {
  return `${GET_LIST_READ_FOLLOWING_API_KEY()}/followings?page=${url.page}&pageSize=${url.pageSize}`;
};
export const requestListReadFollowing = (url: ListReadFollowingUrlQuery) => {
  return axios.get<ListReadFollowingRes>(GET_LIST_READ_FOLLOWING_API(url));
};

/**
 * * 나를 팔로워 하는 유저 목록 조회 GET
 * * url: /user/followers?pageSize=:pageSize
 * * body: empty
 * * res: ListReadFollowRes
 */
export type ListReadFollowerUrlQuery = {
  page: number;
  pageSize: number;
};
export interface ListReadFollowerResData extends ListReadCommonRes {
  list: User[];
}
export interface ListReadFollowerRes extends CommonRes {
  resData: ListReadFollowerResData;
}
export const GET_LIST_READ_FOLLOWER_API_KEY = () => {
  return `/user`;
};
export const GET_LIST_READ_FOLLOWER_API = (url: ListReadFollowerUrlQuery) => {
  return `${GET_LIST_READ_FOLLOWER_API_KEY()}/followers?page=${url.page}&pageSize=${url.pageSize}`;
};
export const requestListReadFollower = (url: ListReadFollowerUrlQuery) => {
  return axios.get<ListReadFollowerRes>(GET_LIST_READ_FOLLOWER_API(url));
};

/**
 * * 유저 팔로우 PATCH
 * * url: /user/follow/:userId
 * * body: empty
 * * res: FollowRes
 */
export type FollowUrlQuery = {
  userId: number;
};
export type FollowResData = {
  userId: number;
};
export interface FollowRes extends CommonRes {
  resData: FollowResData;
}
export const GET_FOLLOW_API = (url: FollowUrlQuery) => {
  return `/user/follow/${url.userId}`;
};
export const requestFollow = (url: FollowUrlQuery) => {
  return axios.patch<FollowRes>(GET_FOLLOW_API(url));
};

/**
 * * 유저 팔로우 삭제 DELETE
 * * url: /user/follow/:userId
 * * body: empty
 * * res: UnFollowRes
 */
export type UnFollowUrlQuery = {
  userId: number;
};
export type UnFollowResData = {
  userId: number;
};
export interface UnFollowRes extends CommonRes {
  resData: UnFollowResData;
}
export const GET_UNFOLLOW_API = (url: UnFollowUrlQuery) => {
  return `/user/follow/${url.userId}`;
};
export const requestUnfollow = (url: UnFollowUrlQuery) => {
  return axios.delete<UnFollowRes>(GET_UNFOLLOW_API(url));
};

/**
 * * 나를 팔로워 하는 유저 삭제 DELETE
 * * url: /user/follower/:userId
 * * body: empty
 * * res: RemoveFollowerMeRes
 */
export type RemoveFollowerMeUrlQuery = {
  userId: number;
};
export type RemoveFollowerMeResData = {
  userId: number;
};
export interface RemoveFollowerMeRes extends CommonRes {
  resData: RemoveFollowerMeResData;
}
export const GET_REMOVE_FOLLOWER_ME_API = (url: RemoveFollowerMeUrlQuery) => {
  return `/user/follower/${url.userId}`;
};
export const requestRemoveFollowerMe = (url: RemoveFollowerMeUrlQuery) => {
  return axios.delete<RemoveFollowerMeRes>(GET_REMOVE_FOLLOWER_ME_API(url));
};
