import { all, fork, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';

import { hashtagAction } from './slice';

const listReadHashtagSaga = createRequestSaga(hashtagAction.listReadHashtag, hashtagAction.listReadHashtag.requestAPI);

function* watchListRead() {
  yield takeLatest(hashtagAction.listReadHashtag.request, listReadHashtagSaga);
}

export default function* hashtagSaga() {
  yield all([fork(watchListRead)]);
}
