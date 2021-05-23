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
  infinitePost: IPost[];
  infiniteUserPost: IPost[];
  infiniteHashTagPost: IPost[];
  list: IPost[];
  data: IPost | null;
}

// Reducer
const initialState: IState = {
  infinitePost: [],
  infiniteUserPost: [],
  infiniteHashTagPost: [],
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
        state.infinitePost.push(...data);
      })
      .addCase(listReadUserPost.success, (state, { payload: data }) => {
        state.infiniteUserPost.push(...data);
      })
      .addCase(listReadHashTagPost.success, (state, { payload: data }) => {
        state.infiniteHashTagPost.push(...data);
      })
      .addCase(retweetPost.success, (state, { payload: data }) => {
        state.infinitePost.unshift(data);
      })
      .addCase(createPost.success, (state, { payload: data }) => {
        state.infinitePost.unshift(data);
      })
      .addCase(modifyPost.success, (state, { payload: data }) => {
        const post = state.list.find((v) => v.id === data.PostId);
        const infinitePost = state.infinitePost.find((v) => v.id === data.PostId);
        const infiniteUserPost = state.infiniteUserPost.find((v) => v.id === data.PostId);
        const infiniteHashTagPost = state.infiniteHashTagPost.find((v) => v.id === data.PostId);
        if (post) post.content = data.content;
        if (infinitePost) infinitePost.content = data.content;
        if (infiniteUserPost) infiniteUserPost.content = data.content;
        if (infiniteHashTagPost) infiniteHashTagPost.content = data.content;
      })
      .addCase(removePost.success, (state, { payload: data }) => {
        state.list = state.list.filter((v) => v.id !== data.PostId);
        state.infinitePost = state.infinitePost.filter((v) => v.id !== data.PostId);
        state.infiniteUserPost = state.infiniteUserPost.filter((v) => v.id !== data.PostId);
        state.infiniteHashTagPost = state.infiniteHashTagPost.filter((v) => v.id !== data.PostId);
      })
      .addCase(likePost.success, (state, { payload: data }) => {
        state.list.find((v) => v.id === data.PostId)?.Likers.push({ id: data.UserId });
        state.infinitePost.find((v) => v.id === data.PostId)?.Likers.push({ id: data.UserId });
        state.infiniteUserPost.find((v) => v.id === data.PostId)?.Likers.push({ id: data.UserId });
        state.infiniteHashTagPost.find((v) => v.id === data.PostId)?.Likers.push({ id: data.UserId });
      })
      .addCase(unlikePost.success, (state, { payload: data }) => {
        const post = state.list.find((v) => v.id === data.PostId);
        const infinitePost = state.infinitePost.find((v) => v.id === data.PostId);
        const infiniteUserPost = state.infiniteUserPost.find((v) => v.id === data.PostId);
        const infiniteHashTagPost = state.infiniteHashTagPost.find((v) => v.id === data.PostId);
        if (post) post.Likers = post.Likers.filter((v) => v.id !== data.UserId);
        if (infinitePost) infinitePost.Likers = infinitePost?.Likers.filter((v) => v.id !== data.UserId);
        if (infiniteUserPost) infiniteUserPost.Likers = infiniteUserPost?.Likers.filter((v) => v.id !== data.UserId);
        if (infiniteHashTagPost) {
          infiniteHashTagPost.Likers = infiniteHashTagPost?.Likers.filter((v) => v.id !== data.UserId);
        }
      })
      .addCase(createComment.success, (state, { payload: data }) => {
        state.list.find((v) => v.id === data.PostId)?.Comments.unshift(data);
        state.infinitePost.find((v) => v.id === data.PostId)?.Comments.unshift(data);
        state.infiniteUserPost.find((v) => v.id === data.PostId)?.Comments.unshift(data);
        state.infiniteHashTagPost.find((v) => v.id === data.PostId)?.Comments.unshift(data);
      })
      .addDefaultCase((state) => state),
});

export const postReducer = slice.reducer;
export const postAction = slice.actions;
