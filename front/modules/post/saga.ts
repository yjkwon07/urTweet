import { all, fork, takeLatest, debounce, call, select, put } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';
import { addPostToMe, removePostToMe } from '@modules/user';

import {
  likePost,
  unlikePost,
  readPost,
  listReadPost,
  createPost,
  updatePost,
  removePost,
  createComment,
  createRetweet,
} from './slice';

const retweetPostSaga = createRequestSaga(createRetweet, createRetweet.requestAPI);
const createPostSaga = createRequestSaga(createPost, createPost.requestAPI);
const readPostSaga = createRequestSaga(readPost, readPost.requestAPI);
const listReadPostSaga = createRequestSaga(listReadPost, listReadPost.requestAPI);
const updatePostSaga = createRequestSaga(updatePost, updatePost.requestAPI);
const removePostSaga = createRequestSaga(removePost, removePost.requestAPI);
const unlikePostSaga = createRequestSaga(unlikePost, unlikePost.requestAPI);
const likePostSaga = createRequestSaga(likePost, likePost.requestAPI);
const createCommentSaga = createRequestSaga(createComment, createComment.requestAPI);

function* watchRetweetPost() {
  yield debounce(300, createRetweet.request, retweetPostSaga);
}

function* watchCreatePost() {
  yield debounce(300, createPost.request, function* (action) {
    yield call(createPostSaga, action);
    const rootState: RootState = yield select();
    const { status, data } = rootState.FETCH_STATUS[createPost.TYPE];
    if (status === 'SUCCESS') {
      yield put(addPostToMe(data.id));
    }
  });
}

function* watchReadPost() {
  yield takeLatest(readPost.request, readPostSaga);
}

function* watchListRead() {
  yield takeLatest(listReadPost.request, listReadPostSaga);
}

function* watchUpdatePost() {
  yield takeLatest(updatePost.request, updatePostSaga);
}

function* watchRemovePost() {
  yield takeLatest(removePost.request, function* (action) {
    yield call(removePostSaga, action);
    const rootState: RootState = yield select();
    const { status, data } = rootState.FETCH_STATUS[removePost.TYPE];
    if (status === 'SUCCESS') {
      yield put(removePostToMe(data.PostId));
    }
  });
}

function* watchLikePost() {
  yield takeLatest(likePost.request, likePostSaga);
}

function* watchUnlikePost() {
  yield takeLatest(unlikePost.request, unlikePostSaga);
}

function* watchCreateComment() {
  yield debounce(300, createComment.request, createCommentSaga);
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
