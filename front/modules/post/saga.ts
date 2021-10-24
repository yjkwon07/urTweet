import { all, fork, takeLatest, debounce, put } from 'redux-saga/effects';

import { createFetchSaga } from '@modules/helper';
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
    createFetchSaga(postAction.fetchCreateRetweet, requestCreateRetweet),
  );
}

function* watchCreatePost() {
  yield debounce(
    300,
    postAction.fetchCreatePost.request,
    createFetchSaga(postAction.fetchCreatePost, requestCreatePost, function* (data) {
      yield put(userAction.addPostToMe(data.resData.id));
    }),
  );
}

function* watchReadPost() {
  yield takeLatest(postAction.fetchReadPost.request, createFetchSaga(postAction.fetchReadPost, requestReadPost));
}

function* watchListRead() {
  yield takeLatest(
    postAction.fetchListReadPost.request,
    createFetchSaga(postAction.fetchListReadPost, requestListReadPost),
  );
}

function* watchUpdatePost() {
  yield takeLatest(postAction.fetchUpdatePost.request, createFetchSaga(postAction.fetchUpdatePost, requestUpdatePost));
}

function* watchRemovePost() {
  yield takeLatest(
    postAction.fetchRemovePost.request,
    createFetchSaga(postAction.fetchRemovePost, requestRemovePost, function* (data) {
      yield put(userAction.removePostToMe(data.resData.PostId));
    }),
  );
}

function* watchLikePost() {
  yield takeLatest(postAction.fetchLikePost.request, createFetchSaga(postAction.fetchLikePost, requestLikePost));
}

function* watchUnlikePost() {
  yield takeLatest(postAction.fetchUnlikePost.request, createFetchSaga(postAction.fetchUnlikePost, requestUnlikePost));
}

function* watchCreateComment() {
  yield debounce(
    300,
    postAction.fetchCreateComment.request,
    createFetchSaga(postAction.fetchCreateComment, requestCreateComment),
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
