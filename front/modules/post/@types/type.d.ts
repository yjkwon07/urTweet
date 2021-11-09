import * as yup from 'yup';

import { CREATE_COMMENT_SCHEMA, EDIT_POST_SCHEMA } from '../config';

export type FormCreateComment = yup.InferType<typeof CREATE_COMMENT_SCHEMA>;

export type FormEditPost = yup.InferType<typeof EDIT_POST_SCHEMA>;
