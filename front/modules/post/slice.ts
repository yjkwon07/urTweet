import { createSlice } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper/createRequestAction';

import { IPost } from './@types/db';
import {
  requestCreateComment,
  requestCreatePost,
  requestCreatePostRetweet,
  requestLikePost,
  requestListReadHashtagPost,
  requestListReadPost,
  requestListReadUserPost,
  requestModifyPost,
  requestReadPost,
  requestRemovePost,
  requestUnlikePost,
  requestUploadPostImages,
} from './api/requestAPI';

export const POST = 'POST';

// Action - API
export const uploadImages = createRequestAction(`${POST}/uploadImages`, requestUploadPostImages);
export const listReadUserPost = createRequestAction(`${POST}/listReadUserPost`, requestListReadUserPost);
export const infinteListReadPost = createRequestAction(`${POST}infinteListReadPost`, requestListReadPost);
export const listReadHashTagPost = createRequestAction(`${POST}/listReadHashTagPost`, requestListReadHashtagPost);
export const listReadPost = createRequestAction(`${POST}listReadPost`, requestListReadPost);
export const readPost = createRequestAction(`${POST}/readPost`, requestReadPost);
export const retweetPost = createRequestAction(`${POST}/retweetPost`, requestCreatePostRetweet);
export const createPost = createRequestAction(`${POST}/createPost`, requestCreatePost);
export const modifyPost = createRequestAction(`${POST}/modifyPost`, requestModifyPost);
export const removePost = createRequestAction(`${POST}/removePost`, requestRemovePost);
export const likePost = createRequestAction(`${POST}/likePost`, requestLikePost);
export const unlikePost = createRequestAction(`${POST}/unlikePost`, requestUnlikePost);
export const createComment = createRequestAction(`${POST}/createComment`, requestCreateComment);

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
