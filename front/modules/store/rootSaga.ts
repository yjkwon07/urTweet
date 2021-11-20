import { all, fork } from 'redux-saga/effects';

import hashtagSaga from '@modules/hashtag/saga';

export default function* rootSaga() {
  yield all([fork(hashtagSaga)]);
}
