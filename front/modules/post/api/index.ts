import { axios } from '@modules/client';

import { IComment, IPost } from '../@types/db';

/**
 * * post 게시글 정보 조회 GET
 * * url: /post/:postId
 * * body: empty
 * * res: IPost
 */
export type ReadPostUrlQuery = {
  postId: number;
};
export function GET_READ_POST_API(url: ReadPostUrlQuery) {
  return `/post/${url.postId}`;
}
export const requestReadPost = (url: ReadPostUrlQuery) => {
  return axios.get<IPost>(GET_READ_POST_API(url));
};

/**
 * * post 게시글 리스트 정보 조회 GET
 * * url: /posts?page=:page&pageSize=:pageSize&hashtag=:hashtag
 * * body: empty
 * * res: IPost[]
 */
export type ListReadPostUrlQuery = {
  page: number;
  pageSize: number;
  hashtag?: string;
};
interface ListReadPostResData extends ListReadCommonRes {
  list: IPost[];
}
export function GET_LIST_READ_POST_API(url: ListReadPostUrlQuery) {
  return `/posts?page=${url.page}&pageSize=${url.pageSize}&hashtag=${url.hashtag || ''}`;
}
export const requestListReadPost = (url: ListReadPostUrlQuery) => {
  return axios.get<ListReadPostResData>(GET_LIST_READ_POST_API(url));
};

/**
 * * post 유저 게시글 리스트 정보 조회 GET
 * * url: /user/:userId/posts?lastId=:lastId&pageSize=:pageSize
 * * body: empty
 * * res: IPost[]
 */
export type ListReadUserPostUrlQuery = {
  userId: number;
  lastId: number;
  pageSize: number;
};
export function GET_LIST_READ_USER_POST_API(url: ListReadUserPostUrlQuery) {
  return `/user/${url.userId}/posts?lastId=${url.lastId}&pageSize=${url.pageSize}`;
}
export const requestListReadUserPost = (url: ListReadUserPostUrlQuery) => {
  return axios.get<IPost[]>(GET_LIST_READ_USER_POST_API(url));
};

/**
 * * 해당 게시글 리트윗 POST
 * * url: /post/:postId/retweet
 * * body: empty
 * * res: IPost
 */
export type CreatePostRetweetUrlQuery = {
  postId: number;
};
export function GET_CREATE_POST_RETWEET_API(url: CreatePostRetweetUrlQuery) {
  return `/post/${url.postId}/retweet`;
}
export const requestCreatePostRetweet = (url: CreatePostRetweetUrlQuery) => {
  return axios.post<IPost>(GET_CREATE_POST_RETWEET_API(url));
};

/**
 * * 게시글 등록 POST
 * * url: /post
 * * body: CreatePostBodyQuery
 * * res: IPost
 */
export type CreatePostBodyQuery = {
  content: string;
  image?: string[] | string;
};
export function GET_CREATE_POST_API() {
  return `/post`;
}
export const requestCreatePost = (body: CreatePostBodyQuery) => {
  return axios.post<IPost>(GET_CREATE_POST_API(), body);
};

/**
 * * 게시글 수정 PATCH
 * * url: /post/:postId
 * * body: ModifyPostBodyQuery
 * * res: ModifyPostRes
 */
type ModifyPostUrlQuery = {
  postId: number;
};
type ModifyPostBodyQuery = {
  content: string;
  image?: string[] | string;
};
export type ModifyPostReq = {
  url: ModifyPostUrlQuery;
  body: ModifyPostBodyQuery;
};
export type ModifyPostRes = {
  PostId: number;
  content: string;
};
export function GET_MODIFY_POST_API(url: ModifyPostUrlQuery) {
  return `/post/${url.postId}`;
}
export const requestModifyPost = ({ url, body }: ModifyPostReq) => {
  return axios.patch<ModifyPostRes>(GET_MODIFY_POST_API(url), body);
};

/**
 * * 게시글 삭제 DELETE
 * * url: /post/:postId
 * * body: empty
 * * res: RemovePostRes
 */
export type RemovePostUrlQuery = {
  postId: number;
};
export type RemovePostRes = {
  PostId: number;
};
export function GET_REMOVE_POST_API(url: RemovePostUrlQuery) {
  return `/post/${url.postId}`;
}
export const requestRemovePost = (url: RemovePostUrlQuery) => {
  return axios.delete<RemovePostRes>(GET_REMOVE_POST_API(url));
};

/**
 * * 해당 게시글 좋아요 PATCH
 * * url: /post/:postId/like
 * * body: empty
 * * res: LikePostRes
 */
export type LikePostUrlQuery = {
  postId: number;
};
export type LikePostRes = {
  PostId: number;
  UserId: number;
};
export function GET_MODIFY_LIKE_POST_API(url: LikePostUrlQuery) {
  return `/post/${url.postId}/like`;
}
export const requestLikePost = (url: LikePostUrlQuery) => {
  return axios.patch<LikePostRes>(GET_MODIFY_LIKE_POST_API(url));
};

/**
 * * 해당 게시글 좋아요 취소 DELETE
 * * url: /post/:postId/like
 * * body: empty
 * * res: UnlikePostRes
 */
export type UnLikePostUrlQuery = {
  postId: number;
};
export type UnlikePostRes = {
  PostId: number;
  UserId: number;
};
export function GET_REMOVE_LIKE_POST_API(url: UnLikePostUrlQuery) {
  return `/post/${url.postId}/like`;
}
export const requestUnlikePost = (url: UnLikePostUrlQuery) => {
  return axios.delete<UnlikePostRes>(GET_REMOVE_LIKE_POST_API(url));
};

/**
 * * 해당 게시글 댓글 등록 POST
 * * url: /post/:postId/comment
 * * body: CreateCommentBodyQuery
 * * res: IUnlikePostRes
 */
type CreateCommentUrlQuery = {
  postId: number;
};
type CreateCommentBodyQuery = {
  content: string;
  userId: number;
};
export type ICreateCommentReq = {
  url: CreateCommentUrlQuery;
  body: CreateCommentBodyQuery;
};
export function GET_CREATE_COMMENT_API(url: CreateCommentUrlQuery) {
  return `/post/${url.postId}/comment`;
}
export const requestCreateComment = ({ url, body }: ICreateCommentReq) => {
  return axios.post<IComment>(GET_CREATE_COMMENT_API(url), body);
};

/**
 * * 해당 게시글 이미지 업로드 POST
 * * url: /post/images
 * * body: UploadImageBody
 * * res: UploadImagePathRes
 */
export type UploadImageBody = FormData;
export type UploadImagePathRes = string[];
export function GET_UPLOAD_POST_IMAGES_API() {
  return `/post/images`;
}
export const requestUploadPostImages = (body: UploadImageBody) => {
  return axios.post<UploadImagePathRes>(GET_UPLOAD_POST_IMAGES_API(), body);
};
