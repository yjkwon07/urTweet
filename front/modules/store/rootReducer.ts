import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { HASHTAG, hashtagReducer } from '@modules/hashtag';

import { FETCH_STATUS, fetchStatusReducer } from '../fetchStatus';

const reducer = combineReducers({
  [FETCH_STATUS]: fetchStatusReducer,
  [HASHTAG]: hashtagReducer,
});

declare global {
  type RootState = ReturnType<typeof reducer>;
}

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
