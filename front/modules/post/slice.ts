import { createAction, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper';

import { Post } from './@types';
import {
  requestCreateComment,
  requestCreatePost,
  requestCreatePostRetweet,
  requestLikePost,
  requestListReadPost,
  requestUpdatePost,
  requestReadPost,
  requestRemovePost,
  requestUnlikePost,
} from './api';

export const POST = 'POST';

// Action - API
export const retweetPost = createRequestAction(`${POST}/retweetPost`, requestCreatePostRetweet);
export const createPost = createRequestAction(`${POST}/createPost`, requestCreatePost);
export const listReadPost = createRequestAction(`${POST}listReadPost`, requestListReadPost);
export const readPost = createRequestAction(`${POST}/readPost`, requestReadPost);
export const updatePost = createRequestAction(`${POST}/updatePost`, requestUpdatePost);
export const removePost = createRequestAction(`${POST}/removePost`, requestRemovePost);
export const likePost = createRequestAction(`${POST}/likePost`, requestLikePost);
export const unlikePost = createRequestAction(`${POST}/unlikePost`, requestUnlikePost);
export const createComment = createRequestAction(`${POST}/createComment`, requestCreateComment);

// Action
export const listReadReset = createAction(`${POST}/listReadReset`);

// Entity
const postListDataAdapter = createEntityAdapter<Post>({
  selectId: (data) => data.id,
});

// Type
export type PostState = EntityState<Post>;

// Reducer
const initialState: PostState = postListDataAdapter.getInitialState();

const slice = createSlice({
  name: POST,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(listReadReset, (state) => {
        postListDataAdapter.removeAll(state);
      })
      .addCase(readPost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.setAll(state, [resData.item]);
      })
      .addCase(listReadPost.success, (state, { payload: { resData }, meta }) => {
        if (meta?.isLoadMore) {
          postListDataAdapter.removeMany(
            state,
            resData.list.map((data) => data.id),
          );
          postListDataAdapter.addMany(state, resData.list);
        } else postListDataAdapter.setAll(state, resData.list);
      })
      .addCase(retweetPost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.addOne(state, resData);
      })
      .addCase(createPost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.addOne(state, resData);
      })
      .addCase(updatePost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.updateOne(state, {
          id: resData.id,
          changes: resData,
        });
      })
      .addCase(removePost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.removeOne(state, resData.PostId);
      })
      .addCase(likePost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.updateOne(state, {
          id: resData.PostId,
          changes: { Likers: state.entities[resData.PostId]?.Likers.concat({ id: resData.UserId }) },
        });
      })
      .addCase(unlikePost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.updateOne(state, {
          id: resData.PostId,
          changes: { Likers: state.entities[resData.PostId]?.Likers.filter((liker) => liker.id !== resData.UserId) },
        });
      })
      .addCase(createComment.success, (state, { payload: { resData } }) => {
        postListDataAdapter.updateOne(state, {
          id: resData.PostId,
          changes: { Comments: [resData].concat(state.entities[resData.PostId]?.Comments || []) },
        });
      })
      .addDefaultCase((state) => state),
});

export const postSelector = {
  listData: postListDataAdapter.getSelectors((state: RootState) => state.POST).selectAll,
  data: postListDataAdapter.getSelectors((state: RootState) => state.POST).selectIds,
};

export const postReducer = slice.reducer;
export const postAction = slice.actions;
