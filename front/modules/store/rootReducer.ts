import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { searchFilterReducer, SEARCH_FILTER } from '@modules/searchFilter';

import { FETCH_STATUS, fetchStatusReducer } from '../fetchStatus';
import { POST, postReducer } from '../post';
import { USER, userReducer } from '../user';

const reducer = combineReducers({
  [SEARCH_FILTER]: searchFilterReducer,
  [FETCH_STATUS]: fetchStatusReducer,
  [USER]: userReducer,
  [POST]: postReducer,
});

declare global {
  type RootState = ReturnType<typeof reducer>;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default: {
      return reducer(state, action);
    }
  }
};

export default rootReducer;