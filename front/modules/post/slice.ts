import { createSlice } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper/createRequestAction';

import { IComment, ILike, IPost } from './@types/db';
import {
  IUploadImagePathRes,
  IListReadHashtagPostURL,
  IListReadPostURL,
  IListReadUserPostURL,
  IModifyPostRes,
  IPostBodyQuery,
  IPostURL,
  IRemovePostRes,
  IUploadImageBodyQuery,
  IModifyPostReq,
  ICreateCommentReq,
} from './@types/query';

export const POST = 'POST';

// Action
export const uploadImages = createRequestAction<IUploadImageBodyQuery, IUploadImagePathRes>(`${POST}/uploadImages`);
export const listReadUserPost = createRequestAction<IListReadUserPostURL, IPost[]>(`${POST}/listReadUserPost`);
export const infinteListReadPost = createRequestAction<IListReadPostURL, IPost[]>(`${POST}infinteListReadPost`);
export const listReadHashTagPost = createRequestAction<IListReadHashtagPostURL, IPost[]>(`${POST}/listReadHashTagPost`);
export const listReadPost = createRequestAction<IListReadPostURL, IPost[]>(`${POST}listReadPost`);
export const readPost = createRequestAction<IPostURL, IPost>(`${POST}/readPost`);
export const retweetPost = createRequestAction<IPostURL, IPost>(`${POST}/retweetPost`);
export const createPost = createRequestAction<IPostBodyQuery, IPost>(`${POST}/createPost`);
export const modifyPost = createRequestAction<IModifyPostReq, IModifyPostRes>(`${POST}/modifyPost`);
export const removePost = createRequestAction<IPostURL, IRemovePostRes>(`${POST}/removePost`);
export const likePost = createRequestAction<IPostURL, ILike>(`${POST}/likePost`);
export const unlikePost = createRequestAction<IPostURL, ILike>(`${POST}/unlikePost`);
export const createComment = createRequestAction<ICreateCommentReq, IComment>(`${POST}/createComment`);

// Type
export interface IState {
  infiniteList: IPost[];
  list: IPost[];
  data: IPost | null;
}

// Reducer
const initialState: IState = {
  infiniteList: [],
  list: [],
  data: null,
};

const slice = createSlice({
  name: POST,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(readPost.success, (state, { payload: data }) => {
        state.data = data;
      })
      .addCase(listReadPost.success, (state, { payload: data }) => {
        state.list = data;
      })
      .addCase(infinteListReadPost.success, (state, { payload: data }) => {
        state.infiniteList.push(...data);
      })
      .addCase(listReadUserPost.success, (state, { payload: data }) => {
        state.infiniteList.push(...data);
      })
      .addCase(listReadHashTagPost.success, (state, { payload: data }) => {
        state.infiniteList.push(...data);
      })
      .addCase(retweetPost.success, (state, { payload: data }) => {
        state.infiniteList.unshift(data);
      })
      .addCase(createPost.success, (state, { payload: data }) => {
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
      .addCase(createComment.success, (state, { payload: data }) => {
        state.list.find((v) => v.id === data.PostId)?.Comments.unshift(data);
        state.infiniteList.find((v) => v.id === data.PostId)?.Comments.unshift(data);
      })
      .addDefaultCase((state) => state),
});

export const postReducer = slice.reducer;
export const postAction = slice.actions;
