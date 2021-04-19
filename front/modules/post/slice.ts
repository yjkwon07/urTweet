import { createSlice } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper/createRequestAction';

import { IComment, ILike, IPost } from './@types/db';
import {
  ICommentBodyQuery,
  IImagePath,
  IListReadHashtagPostURL,
  IListReadPostURL,
  IListReadUserPostURL,
  IPostBodyQuery,
  IPostURL,
  IRemovePostRes,
  IUploadImageBodyQuery,
} from './@types/query';

export const POST = 'POST';

// Action
export const uploadImages = createRequestAction<IUploadImageBodyQuery, IImagePath>(`${POST}/uploadImages`);
export const likePost = createRequestAction<IPostURL, ILike>(`${POST}/likePost`);
export const unlikePost = createRequestAction<IPostURL, ILike>(`${POST}/unlikePost`);
export const readPost = createRequestAction<IPostURL, IPost>(`${POST}/readPost`);
export const listReadUserPost = createRequestAction<IListReadUserPostURL, IPost[]>(`${POST}/listReadUserPost`);
export const listReadHashTagPost = createRequestAction<IListReadHashtagPostURL, IPost[]>(`${POST}/listReadHashTagPost`);
export const listReadPost = createRequestAction<IListReadPostURL, IPost[]>(`${POST}listReadPost`);
export const createPost = createRequestAction<IPostBodyQuery, IPost>(`${POST}/createPost`);
export const modifyPost = createRequestAction<IPostBodyQuery, IPost>(`${POST}/modifyPost`);
export const removePost = createRequestAction<IPostURL, IRemovePostRes>(`${POST}/removePost`);
export const createComment = createRequestAction<{ url: IPostURL; body: ICommentBodyQuery }, IComment>(
  `${POST}/createComment`,
);
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
  extraReducers: (builder) =>
    builder
      .addCase(listReadPost.success, (state, { payload: data }) => {
        state.list = data;
      })
      .addDefaultCase(() => {}),
});

export const postReducer = slice.reducer;
export const postAction = slice.actions;
