import { all, fork } from 'redux-saga/effects';

import hashtagSaga from '@modules/hashtag/saga';
import userSaga from '@modules/user/saga';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(hashtagSaga)]);
}
