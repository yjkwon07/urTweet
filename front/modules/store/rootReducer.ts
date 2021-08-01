import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IFetchStatusState, FETCH_STATUS, fetchStatusReducer } from '../fetchStatus';
import { IPostState, POST, postReducer } from '../post';
import { IUserState, USER, userReducer } from '../user';

declare global {
  interface RootState {
    [FETCH_STATUS]: IFetchStatusState;
    [USER]: IUserState;
    [POST]: IPostState;
  }
}

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default: {
      return combineReducers({
        [FETCH_STATUS]: fetchStatusReducer,
        [USER]: userReducer,
        [POST]: postReducer,
      })(state, action);
    }
  }
};

export default rootReducer;
