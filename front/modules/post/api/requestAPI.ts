import { axios } from '@modules/client';

import { IComment, IPost } from '../@types/db';

// - common
// - URL
export interface IPostURL {
  postId: number;
}

// -- BODY
export interface IPostBody {
  content: string;
  image?: string[] | string;
}

/**
 * * post 게시글 정보 조회 GET
 * * url: /post/:postId
 * * body: {}
 * * res: IPost
 */
export function GET_READ_POST_API(url: IPostURL) {
  return `/post/${url.postId}`;
}
export const requestReadPost = (url: IPostURL) => {
  return axios.get<IPost>(GET_READ_POST_API(url));
};

/**
 * * post 게시글 리스트 정보 조회 GET
 * * url: /posts?lastId=:lasId&pageSize=:pageSize
 * * body: {}
 * * res: IPost[]
 */
export interface IListReadPostURL {
  lastId?: number;
  pageSize: number;
}
export function GET_LIST_READ_POST_API(url: IListReadPostURL) {
  return `/posts?lastId=${url.lastId || 0}&pageSize=${url.pageSize}`;
}
export const requestListReadPost = (url: IListReadPostURL) => {
  return axios.get<IPost[]>(GET_LIST_READ_POST_API(url));
};

/**
 * * 해쉬태그로 게시글 검색 GET
 * * url: /hashtag/:hashtag?lastId=:lastId&pageSize=:pageSize
 * * body: {}
 * * res: IPost[]
 */

export interface IListReadHashtagPostURL {
  hashtag: string;
  lastId?: number;
  pageSize: number;
}
export function GET_LIST_READ_HASHTAG_POST_API(url: IListReadHashtagPostURL) {
  return `/hashtag/${encodeURIComponent(url.hashtag)}?lastId=${url.lastId || 0}&pageSize=${url.pageSize}`;
}
export const requestListReadHashtagPost = (url: IListReadHashtagPostURL) => {
  return axios.get<IPost[]>(GET_LIST_READ_HASHTAG_POST_API(url));
};

/**
 * * post 유저 게시글 리스트 정보 조회 GET
 * * url: /user/:userId/posts?lastId=:lastId&pageSize=:pageSize
 * * body: {}
 * * res: IPost[]
 */
export interface IListReadUserPostURL {
  userId: number;
  lastId?: number;
  pageSize: number;
}
export function GET_LIST_READ_USER_POST_API(url: IListReadUserPostURL) {
  return `/user/${url.userId}/posts?lastId=${url.lastId || 0}&pageSize=${url.pageSize}`;
}
export const requestListReadUserPost = (url: IListReadUserPostURL) => {
  return axios.get<IPost[]>(GET_LIST_READ_USER_POST_API(url));
};

/**
 * * 해당 게시글 리트윗 POST
 * * url: /post/:postId/retweet
 * * body: {}
 * * res: IPost
 */
export function GET_CREATE_POST_RETWEET_API(url: IPostURL) {
  return `/post/${url.postId}/retweet`;
}
export const requestCreatePostRetweet = (url: IPostURL) => {
  return axios.post<IPost>(GET_CREATE_POST_RETWEET_API(url));
};

/**
 * * 게시글 등록 POST
 * * url: /post
 * * body: IPostBody
 * * res: IPost
 */
export function GET_CREATE_POST_API() {
  return `/post`;
}
export const requestCreatePost = (body: IPostBody) => {
  return axios.post<IPost>(GET_CREATE_POST_API(), body);
};

/**
 * * 게시글 수정 PATCH
 * * url: /post/:postId
 * * body: IPostBody
 * * res: IModifyPostRes
 */

export interface IModifyPostReq {
  url: IPostURL;
  body: IPostBody;
}
export interface IModifyPostRes {
  PostId: number;
  content: string;
}
export function GET_MODIFY_POST_API(url: IPostURL) {
  return `/post/${url.postId}`;
}
export const requestModifyPost = ({ url, body }: IModifyPostReq) => {
  return axios.patch<IModifyPostRes>(GET_MODIFY_POST_API(url), body);
};

/**
 * * 게시글 삭제 DELETE
 * * url: /post/:postId
 * * body: {}
 * * res: IRemovePostRes
 */
export interface IRemovePostRes {
  PostId: number;
}
export function GET_REMOVE_POST_API(url: IPostURL) {
  return `/post/${url.postId}`;
}
export const requestRemovePost = (url: IPostURL) => {
  return axios.delete<IRemovePostRes>(GET_REMOVE_POST_API(url));
};

/**
 * * 해당 게시글 좋아요 PATCH
 * * url: /post/:postId/like
 * * body: {}
 * * res: ILikePostRes
 */
export interface ILikePostRes {
  PostId: number;
  UserId: number;
}
export function GET_MODIFY_LIKE_POST_API(url: IPostURL) {
  return `/post/${url.postId}/like`;
}
export const requestLikePost = (url: IPostURL) => {
  return axios.patch<ILikePostRes>(GET_MODIFY_LIKE_POST_API(url));
};

/**
 * * 해당 게시글 좋아요 취소 DELETE
 * * url: /post/:postId/like
 * * body: {}
 * * res: IUnlikePostRes
 */
export interface IUnlikePostRes {
  PostId: number;
  UserId: number;
}
export function GET_REMOVE_LIKE_POST_API(url: IPostURL) {
  return `/post/${url.postId}/like`;
}
export const requestUnlikePost = (url: IPostURL) => {
  return axios.delete<IUnlikePostRes>(GET_REMOVE_LIKE_POST_API(url));
};

/**
 * * 해당 게시글 댓글 등록 POST
 * * url: /post/:postId/comment
 * * body: ICommentBody
 * * res: IUnlikePostRes
 */
export interface ICommentBody {
  content: string;
  userId: number;
}
export interface ICreateCommentReq {
  url: IPostURL;
  body: ICommentBody;
}
export function GET_CREATE_COMMENT_API(url: IPostURL) {
  return `/post/${url.postId}/comment`;
}
export const requestCreateComment = ({ url, body }: ICreateCommentReq) => {
  return axios.post<IComment>(GET_CREATE_COMMENT_API(url), body);
};

/**
 * * 해당 게시글 이미지 업로드 POST
 * * url: /post/images
 * * body: IUploadImageBody
 * * res: IUploadImagePathRes
 */
export type IUploadImageBody = FormData;
export type IUploadImagePathRes = string[];
export function GET_UPLOAD_POST_IMAGES_API() {
  return `/post/images`;
}
export const requestUploadPostImages = (body: IUploadImageBody) => {
  return axios.post<IUploadImagePathRes>(GET_UPLOAD_POST_IMAGES_API(), body);
};
