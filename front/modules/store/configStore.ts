import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import rootSaga from './sagas';
import rootReducer from './slices';

const devMode = process.env.NODE_ENV === 'development';

// Next.js를 사용하게 되면 유저가 요청할 때 마다 redux store를 새로 생성하게 되므로 redux store가 여러 개가 될 수 있다.
// getInitialProps, getServerSideProps 등에서 redux store에 접근할 수 있어야 하는데 그것을 next-redux-wrapper가 도와준다.
const makeStore: MakeStore<RootState> = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware, sagaMiddleware],
    devTools: devMode,
  });
  // Next Redux Toolkit 에서 saga를 사용해야할 때
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: devMode,
});

export default wrapper;
