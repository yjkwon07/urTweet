import { createSlice } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper/createRequestAction';

import { IComment, IImagePath, ILike, IPost, IRemovePostRes } from './@types/db';
import {
  ICommentBodyQuery,
  IListReadHashtagPostURL,
  IListReadPostURL,
  IListReadUserPostURL,
  IPostBodyQuery,
  IPostURL,
} from './@types/query';

export const POST = 'POST';

// Action
export const uploadImages = createRequestAction<null, IImagePath>(`${POST}/uploadImages`);
export const likePost = createRequestAction<IPostURL, ILike>(`${POST}/likePost`);
export const unlikePost = createRequestAction<IPostURL, ILike>(`${POST}/unlikePost`);
export const readPost = createRequestAction<IPostURL, IPost>(`${POST}/readPost`);
export const listReadUserPost = createRequestAction<IListReadUserPostURL, IPost[]>(`${POST}/listReadUserPost`);
export const listReadHashTagPost = createRequestAction<IListReadHashtagPostURL, IPost[]>(`${POST}/listReadHashTagPost`);
export const listReadPost = createRequestAction<IListReadPostURL, IPost[]>(`${POST}listReadPost`);
export const createPost = createRequestAction<IPostBodyQuery, IPost>(`${POST}/createPost`);
export const modifyPost = createRequestAction<IPostBodyQuery, IPost>(`${POST}/modifyPost`);
export const removePost = createRequestAction<IPostURL, IRemovePostRes>(`${POST}/removePost`);
export const createComment = createRequestAction<IPostURL & ICommentBodyQuery, IComment>(`${POST}/createComment`);
export const retweetPost = createRequestAction<IPostURL, IPost>(`${POST}/retweetPost`);

// Type
export interface IState {
  list: IPost[];
  data: IPost | null;
}

// Reducer
const initialState: IState = {
  list: [],
  data: null,
};

const slice = createSlice({
  name: POST,
  initialState,
  reducers: {},
});

export const postReducer = slice.reducer;
export const postAction = slice.actions;
