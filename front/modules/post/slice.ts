import { createAction, createSlice } from '@reduxjs/toolkit';
import _find from 'lodash/find';
import _remove from 'lodash/remove';

import { createRequestAction } from '@modules/helper';

import { IPost } from './@types';
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
} from './api';

export const POST = 'POST';

// Action - API
export const uploadImages = createRequestAction(`${POST}/uploadImages`, requestUploadPostImages);
export const listReadUserPost = createRequestAction(`${POST}/listReadUserPost`, requestListReadUserPost);
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

// Action
export const listReadReset = createAction(`${POST}/listReadReset`);

// Type
export interface IPostState {
  list: IPost[];
  data: IPost | null;
}

// Reducer
const initialState: IPostState = {
  list: [], // 리스트 조회
  data: null, // 단일 조회
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
      .addCase(listReadReset, (state) => {
        state.list = initialState.list;
      })
      .addCase(listReadPost.success, (state, { payload: data, meta }) => {
        if (meta?.isLoadMore) state.list.push(...data);
        else state.list = data;
      })
      .addCase(listReadUserPost.success, (state, { payload: data, meta }) => {
        if (meta?.isLoadMore) state.list.push(...data);
        else state.list = data;
      })
      .addCase(listReadHashTagPost.success, (state, { payload: data, meta }) => {
        if (meta?.isLoadMore) state.list.push(...data);
        else state.list = data;
      })
      .addCase(retweetPost.success, (state, { payload: data, meta }) => {
        if (meta?.isLoadMore) state.list.unshift(data);
      })
      .addCase(createPost.success, (state, { payload: data, meta }) => {
        if (meta?.isLoadMore) state.list.unshift(data);
      })
      .addCase(modifyPost.success, (state, { payload: { PostId, content } }) => {
        const findPost = _find(state.list, { id: PostId });
        if (findPost) findPost.content = content;
      })
      .addCase(removePost.success, (state, { payload: { PostId } }) => {
        _remove(state.list, { id: PostId });
      })
      .addCase(likePost.success, (state, { payload: { PostId, UserId } }) => {
        _find(state.list, { id: PostId })?.Likers.push({ id: UserId });
      })
      .addCase(unlikePost.success, (state, { payload: { PostId, UserId } }) => {
        const findPost = _find(state.list, { id: PostId });
        if (findPost) _remove(findPost.Likers, { id: UserId });
      })
      .addCase(createComment.success, (state, { payload: data }) => {
        _find(state.list, { id: data.PostId })?.Comments.unshift(data);
      })
      .addDefaultCase((state) => state),
});

export const postSelector = {
  list: (state: RootState) => state.POST.list,
  data: (state: RootState) => state.POST.data,
};

export const postReducer = slice.reducer;
export const postAction = slice.actions;
