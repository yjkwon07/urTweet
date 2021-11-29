import { axios } from '@modules/client';

import { Comment, Post } from '../@types';

/**
 * * 해당 게시글 리트윗 POST
 * * url: /post/:postId/retweet
 * * body: empty
 * * res: CreateRetweetRes
 */
export interface CreateRetweetUrlQuery {
  postId: number;
}
export interface CreateRetweetRes extends CommonRes {
  resData: Post;
}
export function GET_CREATE_RETWEET_API(url: CreateRetweetUrlQuery) {
  return `/post/${url.postId}/retweet`;
}
export const requestCreateRetweet = (url: CreateRetweetUrlQuery) => {
  return axios.post<CreateRetweetRes>(GET_CREATE_RETWEET_API(url));
};

/**
 * * 게시글 등록 POST
 * * url: /post
 * * body: CreatePostBodyQuery
 * * res: CreatePostRes
 */
export interface CreatePostBodyQuery {
  content: string;
  image?: string[];
}
export interface CreatePostRes extends CommonRes {
  resData: Post;
}
export function GET_CREATE_POST_API() {
  return `/post`;
}
export const requestCreatePost = (body: CreatePostBodyQuery) => {
  return axios.post<CreatePostRes>(GET_CREATE_POST_API(), body);
};

/**
 * * 게시글 정보 조회 GET
 * * url: /post/:postId
 * * body: empty
 * * res: ReadPostRes
 */
export interface ReadPostUrlQuery {
  postId: number;
}
export interface ReadPostResData {
  item: Post;
}
export interface ReadPostRes extends CommonRes {
  resData: ReadPostResData;
}
export function GET_READ_POST_API_KEY() {
  return `/post`;
}
export function GET_READ_POST_API(url: ReadPostUrlQuery) {
  return `${GET_READ_POST_API_KEY()}/${url.postId}`;
}
export const requestReadPost = (url: ReadPostUrlQuery) => {
  return axios.get<ReadPostRes>(GET_READ_POST_API(url));
};

/**
 * * 게시글 리스트 정보 조회 GET
 * * url: /posts?page=:page&pageSize=:pageSize&hashtag=:hashtag&userId=:userId
 * * body: empty
 * * res: ListReadPostRes
 */
export interface ListReadPostUrlQuery {
  page: number;
  pageSize: number;
  hashtag?: string;
  userId?: number;
}
export interface ListReadPostResData extends ListReadCommonRes {
  list: Post[];
}
export interface ListReadPostRes extends CommonRes {
  resData: ListReadPostResData;
}
export function GET_LIST_READ_POST_API_KEY() {
  return `/posts`;
}
export function GET_LIST_READ_POST_API(url: ListReadPostUrlQuery) {
  return `${GET_LIST_READ_POST_API_KEY()}?page=${url.page}&pageSize=${url.pageSize}&hashtag=${
    url.hashtag ? encodeURIComponent(url.hashtag) : ''
  }&userId=${url.userId}`;
}
export const requestListReadPost = (url: ListReadPostUrlQuery) => {
  return axios.get<ListReadPostRes>(GET_LIST_READ_POST_API(url));
};

/**
 * * 게시글 수정 PATCH
 * * url: /post/:postId
 * * body: UpdatePostBodyQuery
 * * res: UpdatePostRes
 */
export interface UpdatePostUrlQuery {
  postId: number;
}
export interface UpdatePostBodyQuery {
  content: string;
  image?: string[];
}
export interface UpdatePostReq {
  url: UpdatePostUrlQuery;
  body: UpdatePostBodyQuery;
}
export interface UpdatePostRes extends CommonRes {
  resData: Post;
}
export function GET_UPDATE_POST_API(url: UpdatePostUrlQuery) {
  return `/post/${url.postId}`;
}
export const requestUpdatePost = ({ url, body }: UpdatePostReq) => {
  return axios.patch<UpdatePostRes>(GET_UPDATE_POST_API(url), body);
};

/**
 * * 게시글 삭제 DELETE
 * * url: /post/:postId
 * * body: empty
 * * res: RemovePostRes
 */
export interface RemovePostUrlQuery {
  postId: number;
}
export interface RemovePostRes extends CommonRes {
  resData: { PostId: number };
}
export function GET_REMOVE_POST_API(url: RemovePostUrlQuery) {
  return `/post/${url.postId}`;
}
export const requestRemovePost = (url: RemovePostUrlQuery) => {
  return axios.delete<RemovePostRes>(GET_REMOVE_POST_API(url));
};

/**
 * * 게시글 좋아요 PATCH
 * * url: /post/:postId/like
 * * body: empty
 * * res: LikePostRes
 */
export interface LikePostUrlQuery {
  postId: number;
}
export interface LikePostRes extends CommonRes {
  resData: { PostId: number; UserId: number };
}
export function GET_LIKE_POST_API(url: LikePostUrlQuery) {
  return `/post/${url.postId}/like`;
}
export const requestLikePost = (url: LikePostUrlQuery) => {
  return axios.patch<LikePostRes>(GET_LIKE_POST_API(url));
};

/**
 * * 게시글 좋아요 취소 DELETE
 * * url: /post/:postId/like
 * * body: empty
 * * res: UnlikePostRes
 */
export interface UnLikePostUrlQuery {
  postId: number;
}
export interface UnlikePostRes extends CommonRes {
  resData: { PostId: number; UserId: number };
}
export function GET_UNLIKE_POST_API(url: UnLikePostUrlQuery) {
  return `/post/${url.postId}/like`;
}
export const requestUnlikePost = (url: UnLikePostUrlQuery) => {
  return axios.delete<UnlikePostRes>(GET_UNLIKE_POST_API(url));
};

/**
 * * 해당 게시글 댓글 등록 POST
 * * url: /post/:postId/comment
 * * body: CreateCommentBodyQuery
 * * res: CreateCommentRes
 */
export interface CreateCommentUrlQuery {
  postId: number;
}
export interface CreateCommentBodyQuery {
  content: string;
  userId: number;
}
export interface CreateCommentReq {
  url: CreateCommentUrlQuery;
  body: CreateCommentBodyQuery;
}
export interface CreateCommentRes extends CommonRes {
  resData: Comment;
}
export function GET_CREATE_COMMENT_API(url: CreateCommentUrlQuery) {
  return `/post/${url.postId}/comment`;
}
export const requestCreateComment = ({ url, body }: CreateCommentReq) => {
  return axios.post<CreateCommentRes>(GET_CREATE_COMMENT_API(url), body);
};
