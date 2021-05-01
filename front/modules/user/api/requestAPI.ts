import { axios } from '@modules/client';

import { IMyUser, IUser } from '../@types/db';
import {
  IModifyNickNameBodyQuery,
  IUserURL,
  ILoginBodyQuery,
  ISignupBodyQuery,
  IModifyNickNameRes,
  IFollowRes,
  IUnFollowRes,
  ISignupRes,
  IListReadFollowingURL,
  IRemoveFollowerMeRes,
} from '../@types/query';
import {
  GET_MODIFY_NICKNAME_API,
  GET_READ_MY_USER_API,
  GET_READ_USER_API,
  GET_LOGIN_API,
  GET_LOGOUT_API,
  GET_SIGNUP_API,
  GET_FOLLOW_API,
  GET_UNFOLLOW_API,
  GET_LIST_READ_FOLLOW_API,
  GET_LIST_READ_FOLLOWING_API,
  GET_REMOVE_FOLLOWER_ME_API,
} from './link';

export const requestModifyNickname = (data: IModifyNickNameBodyQuery) => {
  return axios.patch<IModifyNickNameRes>(GET_MODIFY_NICKNAME_API(), data);
};

export const requestReadMyUser = () => {
  return axios.get<IMyUser>(GET_READ_MY_USER_API());
};

export const requestReadUser = (url: IUserURL) => {
  return axios.get(GET_READ_USER_API(url));
};

export const requestLogin = (data: ILoginBodyQuery) => {
  return axios.post<IMyUser>(GET_LOGIN_API(), data);
};

export const requestLogout = () => {
  return axios.post(GET_LOGOUT_API());
};

export const requestSignup = (data: ISignupBodyQuery) => {
  return axios.post<ISignupRes>(GET_SIGNUP_API(), data);
};

export const requestListReadFollowing = (url: IListReadFollowingURL) => {
  return axios.get<IUser[]>(GET_LIST_READ_FOLLOWING_API(url));
};

export const requestListReadFollow = (url: IListReadFollowingURL) => {
  return axios.get<IUser[]>(GET_LIST_READ_FOLLOW_API(url));
};

export const requestFollow = (url: IUserURL) => {
  return axios.patch<IFollowRes>(GET_FOLLOW_API(url));
};

export const requestUnfollow = (url: IUserURL) => {
  return axios.delete<IUnFollowRes>(GET_UNFOLLOW_API(url));
};

export const requestRemoveFollowerMe = (url: IUserURL) => {
  return axios.delete<IRemoveFollowerMeRes>(GET_REMOVE_FOLLOWER_ME_API(url));
};
