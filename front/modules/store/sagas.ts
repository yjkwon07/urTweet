import { all, fork } from 'redux-saga/effects';

import userSaga from '@modules/user/saga';

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
