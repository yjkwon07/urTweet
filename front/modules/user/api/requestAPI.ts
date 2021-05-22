import { axios } from '@modules/client';

import { IMyUser, IUser } from '../@types/db';

// - common
// - URL
export interface IUserURL {
  userId: number;
}

/**
 * * 로그인 유저 정보 조회 GET
 * * url: /user
 * * body: {}
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
 * * body: {}
 * * res: IUser
 */
export const GET_READ_USER_API = (url: IUserURL) => {
  return `/user/${url.userId}`;
};
export const requestReadUser = (url: IUserURL) => {
  return axios.get<IUser>(GET_READ_USER_API(url));
};

/**
 * * 로그인 POST
 * * url: /user/login
 * * body: ILoginBody
 * * res: IMyUser
 */
export interface ILoginBody {
  email: string;
  password: string;
}
export const GET_LOGIN_API = () => {
  return `/user/login`;
};
export const requestLogin = (body: ILoginBody) => {
  return axios.post<IMyUser>(GET_LOGIN_API(), body);
};

/**
 * * 로그아웃 POST
 * * url: /user/logout
 * * body: {}
 * * res: 'ok'
 */
export type ILogoutRes = 'ok';
export const GET_LOGOUT_API = () => {
  return `/user/logout`;
};
export const requestLogout = () => {
  return axios.post<ILogoutRes>(GET_LOGOUT_API());
};

/**
 * * 유저 등록 POST
 * * url: /user
 * * body: ISignupBody
 * * res: ISignupRes
 */
export interface ISignupBody {
  email: string;
  nickname: string;
  password: string;
}
export type ISignupRes = 'ok';
export const GET_SIGNUP_API = () => {
  return `/user`;
};
export const requestSignup = (body: ISignupBody) => {
  return axios.post<ISignupRes>(GET_SIGNUP_API(), body);
};

/**
 * * 닉네임 수정 PATCH
 * * url: /user/nickname
 * * body: IModifyNickNameBody
 * * res: IModifyNickNameRes
 */
export interface IModifyNickNameBody {
  nickname: string;
}
export interface IModifyNickNameRes {
  nickname: string;
}
export const GET_MODIFY_NICKNAME_API = () => {
  return `/user/nickname`;
};
export const requestModifyNickname = (body: IModifyNickNameBody) => {
  return axios.patch<IModifyNickNameRes>(GET_MODIFY_NICKNAME_API(), body);
};

/**
 * * 내가 팔로우 하는 유저 목록 조회 GET
 * * url: /user/followings?pageSize=number
 * * body: {}
 * * res: IUser[]
 */
export interface IListReadFollowingURL {
  pageSize?: number;
}
export const GET_LIST_READ_FOLLOWING_API = (url: IListReadFollowingURL) => {
  return `/user/followings?pageSize=${url.pageSize || 0}`;
};
export const requestListReadFollowing = (url: IListReadFollowingURL) => {
  return axios.get<IUser[]>(GET_LIST_READ_FOLLOWING_API(url));
};

/**
 * * 나를 팔로워 하는 유저 목록 조회 GET
 * * url: /user/followers?pageSize=number
 * * body: {}
 * * res: IUser[]
 */
export interface IListReadFollowURL {
  pageSize?: number;
}
export const GET_LIST_READ_FOLLOW_API = (url: IListReadFollowURL) => {
  return `/user/followers?pageSize=${url.pageSize || 0}`;
};
export const requestListReadFollow = (url: IListReadFollowingURL) => {
  return axios.get<IUser[]>(GET_LIST_READ_FOLLOW_API(url));
};

/**
 * * 유저 팔로우 PATCH
 * * url: /user/:userId/follow
 * * body: {}
 * * res: IFollowRes
 */
export interface IFollowRes {
  UserId: number;
}
export const GET_FOLLOW_API = (url: IUserURL) => {
  return `/user/${url.userId}/follow`;
};
export const requestFollow = (url: IUserURL) => {
  return axios.patch<IFollowRes>(GET_FOLLOW_API(url));
};

/**
 * * 유저 팔로우 삭제 DELETE
 * * url: /user/:userId/follow
 * * body: {}
 * * res: IUnFollowRes
 */
export interface IUnFollowRes {
  UserId: number;
}
export const GET_UNFOLLOW_API = (url: IUserURL) => {
  return `/user/${url.userId}/follow`;
};
export const requestUnfollow = (url: IUserURL) => {
  return axios.delete<IUnFollowRes>(GET_UNFOLLOW_API(url));
};

/**
 * * 나를 팔로워 하는 유저 삭제 DELETE
 * * url: /user/follower/:userId
 * * body: {}
 * * res: IRemoveFollowerMeRes
 */
export interface IRemoveFollowerMeRes {
  UserId: number;
}
export const GET_REMOVE_FOLLOWER_ME_API = (url: IUserURL) => {
  return `/user/follower/${url.userId}`;
};
export const requestRemoveFollowerMe = (url: IUserURL) => {
  return axios.delete<IRemoveFollowerMeRes>(GET_REMOVE_FOLLOWER_ME_API(url));
};
