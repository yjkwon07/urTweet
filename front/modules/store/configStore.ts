import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import rootSaga from './sagas';
import rootReducer from './slices';

// Next Redux Toolkit Saga를 사용할때는
// confugureStore에서 강제로 sagaTask를 만들어주기 위함
interface SagaStore extends Store {
  sagaTask?: Task;
}

const devMode = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, sagaMiddleware],
  devTools: devMode,
});

// Next Redux Toolkit 에서 saga를 사용해야할 때
(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

const setupStore = (context: any): EnhancedStore => store;

const makeStore: MakeStore = (context) => setupStore(context);

export const wrapper = createWrapper(makeStore, {
  debug: devMode,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default wrapper;
