import { axios } from '@modules/client';

import { IMyUser, ISignupRes } from '../@types/db';
import { IModifyNickNameBodyQuery, IUserURL, ILoginBodyQuery, ISignupBodyQuery } from '../@types/query';
import {
  GET_MODIFY_NICKNAME_API,
  GET_READ_MY_USER_API,
  GET_READ_USER_API,
  GET_LOGIN_API,
  GET_LOGOUT_API,
  GET_SIGNUP_API,
} from './api';

export const requestModifyNickname = (data: IModifyNickNameBodyQuery) => {
  return axios.patch(GET_MODIFY_NICKNAME_API(), data);
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
