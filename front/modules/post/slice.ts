import { createAction, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper';

import { IPost } from './@types';
import {
  requestCreateComment,
  requestCreatePost,
  requestCreatePostRetweet,
  requestLikePost,
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
export const listReadFilterReset = createAction(`${POST}/listReadFilterReset`);
export const listReadFilterChange = createAction<Partial<IPostState['listReadFilter']>>(`${POST}/listReadFilterChange`);

// Entity
const postListDataAdapter = createEntityAdapter<IPost>({
  selectId: (data) => data.id,
});

// Type
export type IPostState = EntityState<IPost> & {
  listReadFilter: {
    page: number;
    pageSize: number;
    hashtag?: string;
  };
};

// Reducer
const initialState: IPostState = postListDataAdapter.getInitialState({
  listReadFilter: {
    page: 1,
    pageSize: 10,
    hashtag: '',
  },
});

const slice = createSlice({
  name: POST,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(listReadFilterReset, (state) => {
        state.listReadFilter = initialState.listReadFilter;
      })
      .addCase(listReadFilterChange, (state, { payload: data }) => {
        state.listReadFilter = { ...state.listReadFilter, ...data };
      })
      .addCase(listReadReset, (state) => {
        state.listReadFilter = initialState.listReadFilter;
        postListDataAdapter.removeAll(state);
      })
      .addCase(readPost.success, (state, { payload: data }) => {
        postListDataAdapter.setAll(state, [data]);
      })
      .addCase(listReadPost.success, (state, { payload: data, meta }) => {
        if (meta?.isLoadMore) postListDataAdapter.addMany(state, data.list);
        else postListDataAdapter.setAll(state, data.list);
      })
      .addCase(listReadUserPost.success, (state, { payload: data }) => {
        postListDataAdapter.addMany(state, data);
      })
      .addCase(retweetPost.success, (state, { payload: data }) => {
        postListDataAdapter.addOne(state, data);
      })
      .addCase(createPost.success, (state, { payload: data }) => {
        postListDataAdapter.addOne(state, data);
      })
      .addCase(modifyPost.success, (state, { payload: { PostId, content } }) => {
        postListDataAdapter.updateOne(state, { id: PostId, changes: { content } });
      })
      .addCase(removePost.success, (state, { payload: { PostId } }) => {
        postListDataAdapter.removeOne(state, PostId);
      })
      .addCase(likePost.success, (state, { payload: { PostId, UserId } }) => {
        postListDataAdapter.updateOne(state, {
          id: PostId,
          changes: { Likers: state.entities[PostId]?.Likers.concat({ id: UserId }) },
        });
      })
      .addCase(unlikePost.success, (state, { payload: { PostId, UserId } }) => {
        postListDataAdapter.updateOne(state, {
          id: PostId,
          changes: { Likers: state.entities[PostId]?.Likers.filter((liker) => liker.id !== UserId) },
        });
      })
      .addCase(createComment.success, (state, { payload: data }) => {
        postListDataAdapter.updateOne(state, {
          id: data.PostId,
          changes: { Comments: [data].concat(state.entities[data.PostId]?.Comments || []) },
        });
      })
      .addDefaultCase((state) => state),
});

export const postSelector = {
  listReadFilter: (state: RootState) => state.POST.listReadFilter,
  listData: postListDataAdapter.getSelectors((state: RootState) => state.POST).selectAll,
  data: postListDataAdapter.getSelectors((state: RootState) => state.POST).selectIds,
};

export const postReducer = slice.reducer;
export const postAction = slice.actions;
