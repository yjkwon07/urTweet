import { all, fork, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';

import { requestListReadHashtag } from './api';
import { hashtagAction } from './slice';

function* watchListRead() {
  yield takeLatest(
    hashtagAction.fetchListReadHashtag.request,
    createRequestSaga(hashtagAction.fetchListReadHashtag, requestListReadHashtag),
  );
}

export default function* hashtagSaga() {
  yield all([fork(watchListRead)]);
}
