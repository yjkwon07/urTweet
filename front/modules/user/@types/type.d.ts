import * as yup from 'yup';

import { LOGIN_SCHEMA, NICKNAME_SCHEMA } from '../config';

export type FormLogin = yup.InferType<typeof LOGIN_SCHEMA>;

export type FormNickname = yup.InferType<typeof NICKNAME_SCHEMA>;

export type FormSignup = yup.InferType<typeof SIGNUP_SCHEMA>;
