import { axios } from '@modules/client';

import { IListReadHashtagPostURL, IListReadPostURL, IListReadUserPostURL, IPostURL } from '../@types/query';
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
} from './api';

export const requestListReadPost = (url: IListReadPostURL) => {
  return axios.get(GET_LIST_READ_POST_API(url));
};

export const requestListReadHashtagPost = (url: IListReadHashtagPostURL) => {
  return axios.get(GET_LIST_READ_HASHTAG_POST_API(url));
};

export const requestReadPost = (url: IPostURL) => {
  return axios.get(GET_READ_POST_API(url));
};

export const requestListReadUserPost = (url: IListReadUserPostURL) => {
  return axios.get(GET_LIST_READ_USER_POST_API(url));
};

export const requestCreatePost = () => {
  return axios.post(GET_CREATE_POST_API());
};

export const requestLikePost = (url: IPostURL) => {
  return axios.patch(GET_MODIFY_POST_API(url));
};

export const requestUnlikePost = (url: IPostURL) => {
  return axios.delete(GET_REMOVE_POST_API(url));
};

export const requestCreateComment = (url: IPostURL) => {
  return axios.post(GET_CREATE_COMMENT_API(url));
};

export const requestModifyLikePost = (url: IPostURL) => {
  return axios.patch(GET_MODIFY_LIKE_POST_API(url));
};

export const requestRemoveLikePost = (url: IPostURL) => {
  return axios.delete(GET_REMOVE_LIKE_POST_API(url));
};

export const requestUploadPostImages = () => {
  return axios.post(GET_UPLOAD_POST_IMAGES_API());
};

export const requestCreatePostRetweet = (url: IPostURL) => {
  return axios.post(GET_CREATE_POST_RETWEET_API(url));
};
