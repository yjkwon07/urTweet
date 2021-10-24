import { all, fork, takeLatest, debounce, put } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';
import { userAction } from '@modules/user';

import {
  requestCreateComment,
  requestCreatePost,
  requestCreateRetweet,
  requestLikePost,
  requestListReadPost,
  requestUpdatePost,
  requestReadPost,
  requestRemovePost,
  requestUnlikePost,
} from './api';
import { postAction } from './slice';

function* watchRetweetPost() {
  yield debounce(
    300,
    postAction.fetchCreateRetweet.request,
    createRequestSaga(postAction.fetchCreateRetweet, requestCreateRetweet),
  );
}

function* watchCreatePost() {
  yield debounce(
    300,
    postAction.fetchCreatePost.request,
    createRequestSaga(postAction.fetchCreatePost, requestCreatePost, function* (data) {
      yield put(userAction.addPostToMe(data.resData.id));
    }),
  );
}

function* watchReadPost() {
  yield takeLatest(postAction.fetchReadPost.request, createRequestSaga(postAction.fetchReadPost, requestReadPost));
}

function* watchListRead() {
  yield takeLatest(
    postAction.fetchListReadPost.request,
    createRequestSaga(postAction.fetchListReadPost, requestListReadPost),
  );
}

function* watchUpdatePost() {
  yield takeLatest(
    postAction.fetchUpdatePost.request,
    createRequestSaga(postAction.fetchUpdatePost, requestUpdatePost),
  );
}

function* watchRemovePost() {
  yield takeLatest(
    postAction.fetchRemovePost.request,
    createRequestSaga(postAction.fetchRemovePost, requestRemovePost, function* (data) {
      yield put(userAction.removePostToMe(data.resData.PostId));
    }),
  );
}

function* watchLikePost() {
  yield takeLatest(postAction.fetchLikePost.request, createRequestSaga(postAction.fetchLikePost, requestLikePost));
}

function* watchUnlikePost() {
  yield takeLatest(
    postAction.fetchUnlikePost.request,
    createRequestSaga(postAction.fetchUnlikePost, requestUnlikePost),
  );
}

function* watchCreateComment() {
  yield debounce(
    300,
    postAction.fetchCreateComment.request,
    createRequestSaga(postAction.fetchCreateComment, requestCreateComment),
  );
}

export default function* postSaga() {
  yield all([
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchReadPost),
    fork(watchListRead),
    fork(watchCreatePost),
    fork(watchUpdatePost),
    fork(watchRemovePost),
    fork(watchCreateComment),
    fork(watchRetweetPost),
  ]);
}
