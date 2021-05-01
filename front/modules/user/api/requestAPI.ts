import { axios } from '@modules/client';

import { IMyUser, ISignupRes } from '../@types/db';
import {
  IModifyNickNameBodyQuery,
  IUserURL,
  ILoginBodyQuery,
  ISignupBodyQuery,
  IModifyNickNameRes,
  IFollowRes,
  IUnFollowRes,
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
} from './api';

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

export const requestFollow = (url: IUserURL) => {
  return axios.patch<IFollowRes>(GET_FOLLOW_API(url));
};

export const requestUnfollow = (url: IUserURL) => {
  return axios.delete<IUnFollowRes>(GET_UNFOLLOW_API(url));
};
