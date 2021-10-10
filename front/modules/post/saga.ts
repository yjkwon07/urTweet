import { all, fork, takeLatest, debounce, call, select, put } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';
import { addPostToMe, removePostToMe } from '@modules/user';

import { postAction } from './slice';

const retweetPostSaga = createRequestSaga(postAction.createRetweet, postAction.createRetweet.requestAPI);
const createPostSaga = createRequestSaga(postAction.createPost, postAction.createPost.requestAPI);
const readPostSaga = createRequestSaga(postAction.readPost, postAction.readPost.requestAPI);
const listReadPostSaga = createRequestSaga(postAction.listReadPost, postAction.listReadPost.requestAPI);
const updatePostSaga = createRequestSaga(postAction.updatePost, postAction.updatePost.requestAPI);
const removePostSaga = createRequestSaga(postAction.removePost, postAction.removePost.requestAPI);
const unlikePostSaga = createRequestSaga(postAction.unlikePost, postAction.unlikePost.requestAPI);
const likePostSaga = createRequestSaga(postAction.likePost, postAction.likePost.requestAPI);
const createCommentSaga = createRequestSaga(postAction.createComment, postAction.createComment.requestAPI);

function* watchRetweetPost() {
  yield debounce(300, postAction.createRetweet.request, retweetPostSaga);
}

function* watchCreatePost() {
  yield debounce(300, postAction.createPost.request, function* (action) {
    yield call(createPostSaga, action);
    const rootState: RootState = yield select();
    const { status, data } = rootState.FETCH_STATUS[postAction.createPost.TYPE];
    if (status === 'SUCCESS') {
      yield put(addPostToMe(data.id));
    }
  });
}

function* watchReadPost() {
  yield takeLatest(postAction.readPost.request, readPostSaga);
}

function* watchListRead() {
  yield takeLatest(postAction.listReadPost.request, listReadPostSaga);
}

function* watchUpdatePost() {
  yield takeLatest(postAction.updatePost.request, updatePostSaga);
}

function* watchRemovePost() {
  yield takeLatest(postAction.removePost.request, function* (action) {
    yield call(removePostSaga, action);
    const rootState: RootState = yield select();
    const { status, data } = rootState.FETCH_STATUS[postAction.removePost.TYPE];
    if (status === 'SUCCESS') {
      yield put(removePostToMe(data.PostId));
    }
  });
}

function* watchLikePost() {
  yield takeLatest(postAction.likePost.request, likePostSaga);
}

function* watchUnlikePost() {
  yield takeLatest(postAction.unlikePost.request, unlikePostSaga);
}

function* watchCreateComment() {
  yield debounce(300, postAction.createComment.request, createCommentSaga);
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
