import { createAction, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper';

import { Post } from './@types';
import {
  requestCreateComment,
  requestCreatePost,
  requestCreateRetweet,
  requestLikePost,
  requestListReadPost,
  requestUpdatePost,
  requestReadPost,
  requestRemovePost,
  requestUnlikePost,
} from './api';

export const POST = 'POST';

// Action - API
const createRetweet = createRequestAction(`${POST}/createRetweet`, requestCreateRetweet);
const createPost = createRequestAction(`${POST}/createPost`, requestCreatePost);
const listReadPost = createRequestAction(`${POST}listReadPost`, requestListReadPost);
const readPost = createRequestAction(`${POST}/readPost`, requestReadPost);
const updatePost = createRequestAction(`${POST}/updatePost`, requestUpdatePost);
const removePost = createRequestAction(`${POST}/removePost`, requestRemovePost);
const likePost = createRequestAction(`${POST}/likePost`, requestLikePost);
const unlikePost = createRequestAction(`${POST}/unlikePost`, requestUnlikePost);
const createComment = createRequestAction(`${POST}/createComment`, requestCreateComment);

// Action
const listDataReset = createAction(`${POST}/listDataReset`);

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
      .addCase(listDataReset, (state) => {
        postListDataAdapter.removeAll(state);
      })
      .addCase(createRetweet.success, (state, { payload: { resData } }) => {
        const list = postListDataAdapter.getSelectors().selectAll(state);
        postListDataAdapter.setAll(state, [resData].concat(list));
      })
      .addCase(createPost.success, (state, { payload: { resData } }) => {
        const list = postListDataAdapter.getSelectors().selectAll(state);
        postListDataAdapter.setAll(state, [resData].concat(list));
      })
      .addCase(listReadPost.success, (state, { payload: { resData }, meta }) => {
        const { list } = resData;
        if (meta?.isLoadMore) {
          postListDataAdapter.removeMany(
            state,
            list.map((data) => data.id),
          );
          postListDataAdapter.addMany(state, list);
        } else {
          postListDataAdapter.setAll(state, list);
        }
      })
      .addCase(readPost.success, (state, { payload: { resData } }) => {
        const { item } = resData;
        postListDataAdapter.setAll(state, [item]);
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
          changes: { Comments: state.entities[resData.PostId]?.Comments.concat(resData) },
        });
      }),
});

const { selectAll: listData, selectById } = postListDataAdapter.getSelectors((state: RootState) => state.POST);

export const postReducer = slice.reducer;
export const postSelector = { listData, selectById };
export const postAction = {
  ...slice.actions,
  createRetweet,
  createPost,
  listReadPost,
  readPost,
  updatePost,
  removePost,
  likePost,
  unlikePost,
  createComment,
  listDataReset,
};
