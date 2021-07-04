import { axios } from '@modules/client';

import { IMyUser, IUser } from '../@types/db';

/**
 * * 로그인 유저 정보 조회 GET
 * * url: /user
 * * body: empty
 * * res: IMyUser
 */
export const GET_READ_MY_USER_API = () => {
  return `/user`;
};
export const requestReadMyUser = () => {
  return axios.get<IMyUser>(GET_READ_MY_USER_API());
};

/**
 * * 유저 정보 조회 GET
 * * url: /user/:userId
 * * body: empty
 * * res: IUser
 */
export type ReadUserURL = {
  userId: number;
};
export const GET_READ_USER_API = (url: ReadUserURL) => {
  return `/user/${url.userId}`;
};
export const requestReadUser = (url: ReadUserURL) => {
  return axios.get<IUser>(GET_READ_USER_API(url));
};

/**
 * * 로그인 POST
 * * url: /user/login
 * * body: LoginBodyQuery
 * * res: IMyUser
 */
export type LoginBodyQuery = {
  email: string;
  password: string;
};
export const GET_LOGIN_API = () => {
  return `/user/login`;
};
export const requestLogin = (body: LoginBodyQuery) => {
  return axios.post<IMyUser>(GET_LOGIN_API(), body);
};

/**
 * * 로그아웃 POST
 * * url: /user/logout
 * * body: empty
 * * res: 'ok'
 */
export type LogoutRes = 'ok';
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
export type SignupRes = 'ok';
export const GET_SIGNUP_API = () => {
  return `/user`;
};
export const requestSignup = (body: SignupBodyQuery) => {
  return axios.post<SignupRes>(GET_SIGNUP_API(), body);
};

/**
 * * 닉네임 수정 PATCH
 * * url: /user/nickname
 * * body: ModifyNickNameBodyQuery
 * * res: ModifyNickNameRes
 */
export type ModifyNickNameBodyQuery = {
  nickname: string;
};
export type ModifyNickNameRes = {
  nickname: string;
};
export const GET_MODIFY_NICKNAME_API = () => {
  return `/user/nickname`;
};
export const requestModifyNickname = (body: ModifyNickNameBodyQuery) => {
  return axios.patch<ModifyNickNameRes>(GET_MODIFY_NICKNAME_API(), body);
};

/**
 * * 내가 팔로우 하는 유저 목록 조회 GET
 * * url: /user/followings?pageSize=number
 * * body: empty
 * * res: IUser[]
 */
export type ListReadFollowingURL = {
  pageSize?: number;
};
export const GET_LIST_READ_FOLLOWING_API = (url: ListReadFollowingURL) => {
  return `/user/followings?pageSize=${url.pageSize || 0}`;
};
export const requestListReadFollowing = (url: ListReadFollowingURL) => {
  return axios.get<IUser[]>(GET_LIST_READ_FOLLOWING_API(url));
};

/**
 * * 나를 팔로워 하는 유저 목록 조회 GET
 * * url: /user/followers?pageSize=number
 * * body: empty
 * * res: IUser[]
 */
export type ListReadFollowURL = {
  pageSize?: number;
};
export const GET_LIST_READ_FOLLOW_API = (url: ListReadFollowURL) => {
  return `/user/followers?pageSize=${url.pageSize || 0}`;
};
export const requestListReadFollow = (url: ListReadFollowURL) => {
  return axios.get<IUser[]>(GET_LIST_READ_FOLLOW_API(url));
};

/**
 * * 유저 팔로우 PATCH
 * * url: /user/:userId/follow
 * * body: empty
 * * res: FollowRes
 */
export type FollowURL = {
  userId: number;
};
export type FollowRes = {
  UserId: number;
};
export const GET_FOLLOW_API = (url: FollowURL) => {
  return `/user/${url.userId}/follow`;
};
export const requestFollow = (url: FollowURL) => {
  return axios.patch<FollowRes>(GET_FOLLOW_API(url));
};

/**
 * * 유저 팔로우 삭제 DELETE
 * * url: /user/:userId/follow
 * * body: empty
 * * res: UnFollowRes
 */
export type UnFollowURL = {
  userId: number;
};
export type UnFollowRes = {
  UserId: number;
};
export const GET_UNFOLLOW_API = (url: UnFollowURL) => {
  return `/user/${url.userId}/follow`;
};
export const requestUnfollow = (url: UnFollowURL) => {
  return axios.delete<UnFollowRes>(GET_UNFOLLOW_API(url));
};

/**
 * * 나를 팔로워 하는 유저 삭제 DELETE
 * * url: /user/follower/:userId
 * * body: empty
 * * res: RemoveFollowerMeRes
 */
export type ReomoveFollowerMeURL = {
  userId: number;
};
export type RemoveFollowerMeRes = {
  UserId: number;
};
export const GET_REMOVE_FOLLOWER_ME_API = (url: ReomoveFollowerMeURL) => {
  return `/user/follower/${url.userId}`;
};
export const requestRemoveFollowerMe = (url: ReomoveFollowerMeURL) => {
  return axios.delete<RemoveFollowerMeRes>(GET_REMOVE_FOLLOWER_ME_API(url));
};
