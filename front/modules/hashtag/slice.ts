import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { createFetchAction } from '@modules/helper';

import { Hashtag } from './@types';
import { ListReadHashtagRes, ListReadHashtagUrlQuery } from './api';

export const HASHTAG = 'HASHTAG';

// Action - API
const fetchListReadHashtag = createFetchAction<ListReadHashtagUrlQuery, ListReadHashtagRes>(
  `${HASHTAG}/fetchListReadHashtag`,
);

// Entity
const hashtagListDataAdapter = createEntityAdapter<Hashtag>({
  selectId: (data) => data.id,
});

// Type
export interface HashtagState extends EntityState<Hashtag> {
  curPage: number;
  rowsPerPage: number;
  isMoreRead: boolean;
  totalCount: number;
}
// Reducer
const initialState: HashtagState = hashtagListDataAdapter.getInitialState({
  curPage: 0,
  rowsPerPage: 0,
  isMoreRead: false,
  totalCount: 0,
});

const slice = createSlice({
  name: HASHTAG,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchListReadHashtag.success, (state, { payload: { resData } }) => {
      const { list, curPage, rowsPerPage, totalCount, nextPage } = resData;
      state.curPage = curPage;
      state.rowsPerPage = rowsPerPage;
      state.totalCount = totalCount;
      state.isMoreRead = !!nextPage;
      hashtagListDataAdapter.setAll(state, list);
    }),
});

const { selectAll: listData } = hashtagListDataAdapter.getSelectors((state: RootState) => state.HASHTAG);

export const hashtagReducer = slice.reducer;
export const hashtagSelector = { state: (state: RootState) => state.HASHTAG, listData };
export const hashtagAction = {
  ...slice.actions,
  fetchListReadHashtag,
};
