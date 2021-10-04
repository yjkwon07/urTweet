import { createAction, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { createRequestAction } from '@modules/helper';

import { Hashtag } from './@types';
import { requestListReadHashtag } from './api';

export const HASHTAG = 'HASHTAG';

// Action - API
const listReadHashtag = createRequestAction(`${HASHTAG}listReadHashtag`, requestListReadHashtag);

// Action
const listDataReset = createAction(`${HASHTAG}/listDataReset`);

// Entity
const hashtagListDataAdapter = createEntityAdapter<Hashtag>({
  selectId: (data) => data.id,
});

// Type
export type PostState = EntityState<Hashtag>;

// Reducer
const initialState: PostState = hashtagListDataAdapter.getInitialState();

const slice = createSlice({
  name: HASHTAG,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(listDataReset, (state) => {
        hashtagListDataAdapter.removeAll(state);
      })
      .addCase(listReadHashtag.success, (state, { payload: { resData } }) => {
        const { list } = resData;
        hashtagListDataAdapter.setAll(state, list);
      }),
});

const { selectAll: listData, selectById } = hashtagListDataAdapter.getSelectors((state: RootState) => state.HASHTAG);

export const hashtagReducer = slice.reducer;
export const hashtagSelector = { listData, selectById };
export const hashtagAction = {
  ...slice.actions,
  listReadHashtag,
  listDataReset,
};