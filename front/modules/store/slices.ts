import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { IFetchReducer, FETCH_STATUS, fetchStatusReducer } from '../fetchStatus';
import { IState as IPost, POST, postReducer } from '../post';
import { IState as IUser, USER, userReducer } from '../user';

export interface RootState {
  [FETCH_STATUS]: IFetchReducer;
  [USER]: IUser;
  [POST]: IPost;
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

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default rootReducer;
