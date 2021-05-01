import { createSlice } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper/createRequestAction';

import { IComment, ILike, IPost } from './@types/db';
import {
  ICommentBodyQuery,
  IImagePath,
  IListReadHashtagPostURL,
  IListReadPostURL,
  IListReadUserPostURL,
  IModifyPostRes,
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
export const infinteListReadPost = createRequestAction<IListReadPostURL, IPost[]>(`${POST}infinteListReadPost`);
export const createPost = createRequestAction<IPostBodyQuery, IPost>(`${POST}/createPost`);
export const modifyPost = createRequestAction<{ url: IPostURL; body: IPostBodyQuery }, IModifyPostRes>(
  `${POST}/modifyPost`,
);
export const removePost = createRequestAction<IPostURL, IRemovePostRes>(`${POST}/removePost`);
export const createComment = createRequestAction<{ url: IPostURL; body: ICommentBodyQuery }, IComment>(
  `${POST}/createComment`,
);
export const retweetPost = createRequestAction<IPostURL, IPost>(`${POST}/retweetPost`);

// Type
export interface IState {
  list: IPost[];
  infiniteList: IPost[];
  data: IPost | null;
}

// Reducer
const initialState: IState = {
  list: [],
  infiniteList: [],
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
      .addCase(infinteListReadPost.success, (state, { payload: data }) => {
        state.infiniteList.push(...data);
      })
      .addCase(createPost.success, (state, { payload: data }) => {
        state.infiniteList.unshift(data);
      })
      .addCase(retweetPost.success, (state, { payload: data }) => {
        state.infiniteList.unshift(data);
      })
      .addCase(modifyPost.success, (state, { payload: data }) => {
        const post = state.list.find((v) => v.id === data.PostId);
        const infiniteList = state.infiniteList.find((v) => v.id === data.PostId);
        if (post) post.content = data.content;
        if (infiniteList) infiniteList.content = data.content;
      })
      .addCase(removePost.success, (state, { payload: data }) => {
        state.list = state.list.filter((v) => v.id !== data.PostId);
        state.infiniteList = state.infiniteList.filter((v) => v.id !== data.PostId);
      })
      .addCase(createComment.success, (state, { payload: data }) => {
        state.list.find((v) => v.id === data.PostId)?.Comments.unshift(data);
        state.infiniteList.find((v) => v.id === data.PostId)?.Comments.unshift(data);
      })
      .addCase(likePost.success, (state, { payload: data }) => {
        state.list.find((v) => v.id === data.PostId)?.Likers.push({ id: data.UserId });
        state.infiniteList.find((v) => v.id === data.PostId)?.Likers.push({ id: data.UserId });
      })
      .addCase(unlikePost.success, (state, { payload: data }) => {
        const post = state.list.find((v) => v.id === data.PostId);
        const infiniteList = state.infiniteList.find((v) => v.id === data.PostId);
        if (post) post.Likers = post.Likers.filter((v) => v.id !== data.UserId);
        if (infiniteList) infiniteList.Likers = infiniteList?.Likers.filter((v) => v.id !== data.UserId);
      })
      .addDefaultCase(() => {}),
});

export const postReducer = slice.reducer;
export const postAction = slice.actions;
