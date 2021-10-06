import * as yup from 'yup';

import { LOGIN_SCHEMA, UPDATE_MY_USER_SCHEMA } from '../config';

export type FormLogin = yup.InferType<typeof LOGIN_SCHEMA>;

export type FormUpdateMyUser = yup.InferType<typeof UPDATE_MY_USER_SCHEMA>;

export type FormSignup = yup.InferType<typeof SIGNUP_SCHEMA>;
