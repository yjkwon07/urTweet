import { createAction, createEntityAdapter, createSlice, EntityState, isAnyOf } from '@reduxjs/toolkit';

import { createFetchAction } from '@modules/helper';

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
const fetchCreateRetweet = createFetchAction<CreateRetweetUrlQuery, CreateRetweetRes>(`${POST}/fetchCreateRetweet`);
const fetchCreatePost = createFetchAction<CreatePostBodyQuery, CreatePostRes>(`${POST}/fetchCreatePost`);
const fetchListReadPost = createFetchAction<ListReadPostUrlQuery, ListReadPostRes>(`${POST}fetchListReadPost`);
const fetchReadPost = createFetchAction<ReadPostUrlQuery, ReadPostRes>(`${POST}/fetchReadPost`);
const fetchUpdatePost = createFetchAction<UpdatePostReq, UpdatePostRes>(`${POST}/fetchUpdatePost`);
const fetchRemovePost = createFetchAction<RemovePostUrlQuery, RemovePostRes>(`${POST}/fetchRemovePost`);
const fetchLikePost = createFetchAction<LikePostUrlQuery, LikePostRes>(`${POST}/fetchLikePost`);
const fetchUnlikePost = createFetchAction<UnLikePostUrlQuery, UnlikePostRes>(`${POST}/fetchUnlikePost`);
const fetchCreateComment = createFetchAction<CreateCommentReq, CreateCommentRes>(`${POST}/fetchCreateComment`);

// Action
export interface Filter extends ListReadPostUrlQuery {
  mode: ViewMode;
}
const changeFilter = createAction<{ filter: Filter }>(`${POST}/changeFilter`);
const changeSelectId = createAction<number>(`${POST}/changeSelectId`);

// Entity
const postListDataAdapter = createEntityAdapter<Post>({
  selectId: (data) => data.id,
});

// Type
export interface PostState extends EntityState<Post> {
  selectId: number | null;
  filter: Filter | null;
  isMoreRead: boolean;
  totalCount: number;
}

// Reducer
const initialState: PostState = postListDataAdapter.getInitialState({
  selectId: null,
  filter: null,
  isMoreRead: false,
  totalCount: 0,
});

const slice = createSlice({
  name: POST,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(changeSelectId, (state, { payload }) => {
        state.selectId = payload;
      })
      .addCase(changeFilter, (state, { payload: { filter } }) => {
        state.filter = { ...state.filter, ...filter };
      })
      .addCase(fetchListReadPost.success, (state, { payload: { resData }, meta }) => {
        const { list, totalCount, nextPage } = resData;
        state.totalCount = totalCount;
        state.isMoreRead = !!nextPage;

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
      })
      .addMatcher(isAnyOf(fetchCreatePost.success, fetchCreateRetweet.success), (state, { payload: { resData } }) => {
        const list = postListDataAdapter.getSelectors().selectAll(state);
        postListDataAdapter.setAll(state, [resData].concat(list));
      }),
});

const { selectAll: listData, selectById } = postListDataAdapter.getSelectors((state: RootState) => state.POST);

export const postReducer = slice.reducer;
export const postSelector = {
  state: (state: RootState) => state.POST,
  listData,
  selectById,
};
export const postAction = {
  ...slice.actions,
  changeSelectId,
  changeFilter,
  fetchCreateRetweet,
  fetchCreatePost,
  fetchListReadPost,
  fetchReadPost,
  fetchUpdatePost,
  fetchRemovePost,
  fetchLikePost,
  fetchUnlikePost,
  fetchCreateComment,
};
