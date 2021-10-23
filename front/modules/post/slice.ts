import { createAction, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper';

import { Post } from './@types';
import {
  CreateRetweetUrlQuery,
  CreateRetweetRes,
  CreatePostBodyQuery,
  CreatePostRes,
  ListReadPostUrlQuery,
  ListReadPostRes,
  ReadPostUrlQuery,
  ReadPostRes,
  UpdatePostReq,
  RemovePostUrlQuery,
  UpdatePostRes,
  RemovePostRes,
  LikePostUrlQuery,
  LikePostRes,
  UnLikePostUrlQuery,
  UnlikePostRes,
  CreateCommentReq,
  CreateCommentRes,
} from './api';

export const POST = 'POST';

// Action - API
const fetchCreateRetweet = createRequestAction<CreateRetweetUrlQuery, CreateRetweetRes>(`${POST}/fetchCreateRetweet`);
const fetchCreatePost = createRequestAction<CreatePostBodyQuery, CreatePostRes>(`${POST}/fetchCreatePost`);
const fetchListReadPost = createRequestAction<ListReadPostUrlQuery, ListReadPostRes>(`${POST}fetchListReadPost`);
const fetchReadPost = createRequestAction<ReadPostUrlQuery, ReadPostRes>(`${POST}/fetchReadPost`);
const fetchUpdatePost = createRequestAction<UpdatePostReq, UpdatePostRes>(`${POST}/fetchUpdatePost`);
const fetchRemovePost = createRequestAction<RemovePostUrlQuery, RemovePostRes>(`${POST}/fetchRemovePost`);
const fetchLikePost = createRequestAction<LikePostUrlQuery, LikePostRes>(`${POST}/fetchLikePost`);
const fetchUnlikePost = createRequestAction<UnLikePostUrlQuery, UnlikePostRes>(`${POST}/fetchUnlikePost`);
const fetchCreateComment = createRequestAction<CreateCommentReq, CreateCommentRes>(`${POST}/fetchCreateComment`);

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
      .addCase(fetchCreateRetweet.success, (state, { payload: { resData } }) => {
        const list = postListDataAdapter.getSelectors().selectAll(state);
        postListDataAdapter.setAll(state, [resData].concat(list));
      })
      .addCase(fetchCreatePost.success, (state, { payload: { resData } }) => {
        const list = postListDataAdapter.getSelectors().selectAll(state);
        postListDataAdapter.setAll(state, [resData].concat(list));
      })
      .addCase(fetchListReadPost.success, (state, { payload: { resData }, meta }) => {
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
      .addCase(fetchReadPost.success, (state, { payload: { resData } }) => {
        const { item } = resData;
        postListDataAdapter.setAll(state, [item]);
      })
      .addCase(fetchUpdatePost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.updateOne(state, {
          id: resData.id,
          changes: resData,
        });
      })
      .addCase(fetchRemovePost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.removeOne(state, resData.PostId);
      })
      .addCase(fetchLikePost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.updateOne(state, {
          id: resData.PostId,
          changes: { Likers: state.entities[resData.PostId]?.Likers.concat({ id: resData.UserId }) },
        });
      })
      .addCase(fetchUnlikePost.success, (state, { payload: { resData } }) => {
        postListDataAdapter.updateOne(state, {
          id: resData.PostId,
          changes: { Likers: state.entities[resData.PostId]?.Likers.filter((liker) => liker.id !== resData.UserId) },
        });
      })
      .addCase(fetchCreateComment.success, (state, { payload: { resData } }) => {
        postListDataAdapter.updateOne(state, {
          id: resData.PostId,
          changes: { Comments: state.entities[resData.PostId]?.Comments.concat(resData) },
        });
      }),
});

const { selectAll, selectById } = postListDataAdapter.getSelectors((state: RootState) => state.POST);

export const postReducer = slice.reducer;
export const postSelector = { selectAll, selectById };
export const postAction = {
  ...slice.actions,
  fetchCreateRetweet,
  fetchCreatePost,
  fetchListReadPost,
  fetchReadPost,
  fetchUpdatePost,
  fetchRemovePost,
  fetchLikePost,
  fetchUnlikePost,
  fetchCreateComment,
  listDataReset,
};
