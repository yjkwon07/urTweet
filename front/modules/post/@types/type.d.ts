import * as yup from 'yup';

import { CREATE_COMMENT_SCHEMA, UPDATE_POST_SCHEMA } from '../config';

export type FormCreateComment = yup.InferType<typeof CREATE_COMMENT_SCHEMA>;
export type FormUpdatePost = yup.InferType<typeof UPDATE_POST_SCHEMA>;
