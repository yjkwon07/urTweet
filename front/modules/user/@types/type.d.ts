import * as yup from 'yup';

import { LOGIN_SCHEMA } from '../config';

export type FormLogin = yup.InferType<typeof LOGIN_SCHEMA>;
