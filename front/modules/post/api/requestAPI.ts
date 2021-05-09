import { axios } from '@modules/client';

import { IComment, IPost } from '../@types/db';
import {
  ICreateCommentReq,
  IUploadImagePathRes,
  ILikePostRes,
  IListReadHashtagPostURL,
  IListReadPostURL,
  IListReadUserPostURL,
  IModifyPostReq,
  IModifyPostRes,
  IPostBodyQuery,
  IPostURL,
  IRemovePostRes,
  IUnlikePostRes,
  IUploadImageBodyQuery,
} from '../@types/query';
import {
  GET_CREATE_POST_API,
  GET_LIST_READ_HASHTAG_POST_API,
  GET_LIST_READ_POST_API,
  GET_LIST_READ_USER_POST_API,
  GET_MODIFY_POST_API,
  GET_READ_POST_API,
  GET_REMOVE_POST_API,
  GET_CREATE_COMMENT_API,
  GET_MODIFY_LIKE_POST_API,
  GET_REMOVE_LIKE_POST_API,
  GET_UPLOAD_POST_IMAGES_API,
  GET_CREATE_POST_RETWEET_API,
} from './link';

export const requestReadPost = (url: IPostURL) => {
  return axios.get<IPost>(GET_READ_POST_API(url));
};

export const requestListReadPost = (url: IListReadPostURL) => {
  return axios.get<IPost[]>(GET_LIST_READ_POST_API(url));
};

export const requestListReadHashtagPost = (url: IListReadHashtagPostURL) => {
  return axios.get<IPost[]>(GET_LIST_READ_HASHTAG_POST_API(url));
};

export const requestListReadUserPost = (url: IListReadUserPostURL) => {
  return axios.get<IPost[]>(GET_LIST_READ_USER_POST_API(url));
};

export const requestCreatePostRetweet = (url: IPostURL) => {
  return axios.post<IPost>(GET_CREATE_POST_RETWEET_API(url));
};

export const requestCreatePost = (body: IPostBodyQuery) => {
  return axios.post<IPost>(GET_CREATE_POST_API(), body);
};

export const requestModifyPost = ({ url, body }: IModifyPostReq) => {
  return axios.patch<IModifyPostRes>(GET_MODIFY_POST_API(url), body);
};

export const requestRemovePost = (url: IPostURL) => {
  return axios.delete<IRemovePostRes>(GET_REMOVE_POST_API(url));
};

export const requestLikePost = (url: IPostURL) => {
  return axios.patch<ILikePostRes>(GET_MODIFY_LIKE_POST_API(url));
};

export const requestUnlikePost = (url: IPostURL) => {
  return axios.delete<IUnlikePostRes>(GET_REMOVE_LIKE_POST_API(url));
};

export const requestCreateComment = ({ url, body }: ICreateCommentReq) => {
  return axios.post<IComment>(GET_CREATE_COMMENT_API(url), body);
};

export const requestUploadPostImages = (body: IUploadImageBodyQuery) => {
  return axios.post<IUploadImagePathRes>(GET_UPLOAD_POST_IMAGES_API(), body);
};
