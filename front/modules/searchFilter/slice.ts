import { createAction, createSlice } from '@reduxjs/toolkit';

export interface ISearchFilterState {
  [key: string]: any;
}

// Name
export const SEARCH_FILTER = 'SEARCH_FILTER';

// Action
export const changeSearchFilter = createAction<{ key: string; filter: any }>(`${SEARCH_FILTER}/changeSearchFilter`);
export const resetSearchFilter = createAction<string>(`${SEARCH_FILTER}/resetSearchFilter`);

// Reducer
const initialState: ISearchFilterState = {};
const slice = createSlice({
  name: SEARCH_FILTER,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(changeSearchFilter, (state, { payload: { key, filter } }) => {
        state[key] = { ...state[key], ...filter };
      })
      .addCase(resetSearchFilter, (state, { payload: key }) => {
        state[key] = undefined;
      })
      .addDefaultCase((state) => state),
});

export const searchFilterSelector = {
  searchFilter: (state: RootState) => state.SEARCH_FILTER,
};

export const searchFilterReducer = slice.reducer;
export const searchFilterAction = slice.actions;
