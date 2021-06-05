import { createSlice } from '@reduxjs/toolkit';
import _find from 'lodash/find';
import _remove from 'lodash/remove';

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
  list: IPost[];
  data: IPost | null;
}

// Reducer
const initialState: IState = {
  infinitePost: [], // 무한 스크롤 페이징
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
      .addCase(listReadPost.success, (state, { payload: data }) => {
        state.list = data;
      })
      .addCase(infinteListReadPost.success, (state, { payload: data }) => {
        state.infinitePost.push(...data);
      })
      .addCase(listReadUserPost.success, (state, { payload: data }) => {
        state.infinitePost.push(...data);
      })
      .addCase(listReadHashTagPost.success, (state, { payload: data }) => {
        state.infinitePost.push(...data);
      })
      .addCase(retweetPost.success, (state, { payload: data }) => {
        state.infinitePost.unshift(data);
      })
      .addCase(createPost.success, (state, { payload: data }) => {
        state.infinitePost.unshift(data);
      })
      .addCase(modifyPost.success, (state, { payload: { PostId, content } }) => {
        const listPost = _find(state.list, { id: PostId });
        const infinitePost = _find(state.infinitePost, { id: PostId });
        if (listPost) listPost.content = content;
        if (infinitePost) infinitePost.content = content;
      })
      .addCase(removePost.success, (state, { payload: { PostId } }) => {
        _remove(state.list, { id: PostId });
        _remove(state.infinitePost, { id: PostId });
      })
      .addCase(likePost.success, (state, { payload: { PostId, UserId } }) => {
        _find(state.list, { id: PostId })?.Likers.push({ id: UserId });
        _find(state.infinitePost, { id: PostId })?.Likers.push({ id: UserId });
      })
      .addCase(unlikePost.success, (state, { payload: { PostId, UserId } }) => {
        const listPost = _find(state.list, { id: PostId });
        const infinitePost = _find(state.infinitePost, { id: PostId });
        if (listPost) _remove(listPost.Likers, { id: UserId });
        if (infinitePost) _remove(infinitePost.Likers, { id: UserId });
      })
      .addCase(createComment.success, (state, { payload: data }) => {
        _find(state.list, { id: data.PostId })?.Comments.unshift(data);
        _find(state.infinitePost, { id: data.PostId })?.Comments.unshift(data);
      })
      .addDefaultCase((state) => state),
});

export const postSelector = {
  list: (state: RootState) => state.POST.list,
  infinitePost: (state: RootState) => state.POST.infinitePost,
  infiniteUserPost: (state: RootState) => state.POST.infinitePost,
  infiniteHashTagPost: (state: RootState) => state.POST.infinitePost,
  data: (state: RootState) => state.POST.data,
};

export const postReducer = slice.reducer;
export const postAction = slice.actions;
