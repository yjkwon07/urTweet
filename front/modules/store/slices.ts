import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IFetchReducer, FETCH_STATUS, fetchStatusReducer } from '../fetchStatus';
import { IUser, USER, userReducer } from '../user';

export interface State {
  [FETCH_STATUS]: IFetchReducer;
  [USER]: IUser;
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default: {
      const combineReducer = combineReducers({
        [FETCH_STATUS]: fetchStatusReducer,
        [USER]: userReducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
