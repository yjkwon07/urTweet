import { all, fork } from 'redux-saga/effects';

import postSaga from '@modules/post/saga';
import userSaga from '@modules/user/saga';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
