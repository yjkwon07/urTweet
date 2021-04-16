import { axios } from '@modules/client';

import { IComment, IPost } from '../@types/db';
import {
  ICommentBodyQuery,
  IImagePath,
  ILikePostRes,
  IListReadHashtagPostURL,
  IListReadPostURL,
  IListReadUserPostURL,
  IPostBodyQuery,
  IPostURL,
  IRemovePostRes,
  IUnlikePostRes,
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

export const requestListReadPost = (url: IListReadPostURL) => {
  return axios.get<IPost[]>(GET_LIST_READ_POST_API(url));
};

export const requestListReadHashtagPost = (url: IListReadHashtagPostURL) => {
  return axios.get<IPost[]>(GET_LIST_READ_HASHTAG_POST_API(url));
};

export const requestListReadUserPost = (url: IListReadUserPostURL) => {
  return axios.get<IPost[]>(GET_LIST_READ_USER_POST_API(url));
};

export const requestReadPost = (url: IPostURL) => {
  return axios.get<IPost>(GET_READ_POST_API(url));
};

export const requestCreatePost = (data: IPostBodyQuery) => {
  return axios.post<IPost>(GET_CREATE_POST_API(), data);
};

export const requestLikePost = (url: IPostURL) => {
  return axios.patch<IPost>(GET_MODIFY_POST_API(url));
};

export const requestUnlikePost = (url: IPostURL) => {
  return axios.delete<IRemovePostRes>(GET_REMOVE_POST_API(url));
};

export const requestCreateComment = ({ url, data }: { url: IPostURL; data: ICommentBodyQuery }) => {
  return axios.post<IComment>(GET_CREATE_COMMENT_API(url), data);
};

export const requestModifyLikePost = (url: IPostURL) => {
  return axios.patch<ILikePostRes>(GET_MODIFY_LIKE_POST_API(url));
};

export const requestRemoveLikePost = (url: IPostURL) => {
  return axios.delete<IUnlikePostRes>(GET_REMOVE_LIKE_POST_API(url));
};

export const requestUploadPostImages = () => {
  return axios.post<IImagePath>(GET_UPLOAD_POST_IMAGES_API());
};

export const requestCreatePostRetweet = (url: IPostURL) => {
  return axios.post<IPost>(GET_CREATE_POST_RETWEET_API(url));
};
