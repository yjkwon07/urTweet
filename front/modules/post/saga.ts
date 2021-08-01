import { all, fork, takeLatest, debounce, throttle, call, select, put } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';
import { addPostToMe, removePostToMe } from '@modules/user';

import {
  uploadImages,
  likePost,
  unlikePost,
  readPost,
  listReadUserPost,
  listReadHashTagPost,
  listReadPost,
  createPost,
  modifyPost,
  removePost,
  createComment,
  retweetPost,
} from './slice';

const uploadImagesSaga = createRequestSaga(uploadImages, uploadImages.requestAPI);
const likePostSaga = createRequestSaga(likePost, likePost.requestAPI);
const unlikePostSaga = createRequestSaga(unlikePost, unlikePost.requestAPI);
const readPostSaga = createRequestSaga(readPost, readPost.requestAPI);
const listReadUserPostSaga = createRequestSaga(listReadUserPost, listReadUserPost.requestAPI);
const listReadHashTagPostSaga = createRequestSaga(listReadHashTagPost, listReadHashTagPost.requestAPI);
const listReadPostSaga = createRequestSaga(listReadPost, listReadPost.requestAPI);
const createPostSaga = createRequestSaga(createPost, createPost.requestAPI);
const modifyPostSaga = createRequestSaga(modifyPost, modifyPost.requestAPI);
const removePostSaga = createRequestSaga(removePost, removePost.requestAPI);
const createCommentSaga = createRequestSaga(createComment, createComment.requestAPI);
const retweetPostSaga = createRequestSaga(retweetPost, retweetPost.requestAPI);

function* watchUploadImages() {
  yield takeLatest(uploadImages.request, uploadImagesSaga);
}

function* watchLikePost() {
  yield takeLatest(likePost.request, likePostSaga);
}

function* watchUnlikePost() {
  yield takeLatest(unlikePost.request, unlikePostSaga);
}

function* watchReadPost() {
  yield takeLatest(readPost.request, readPostSaga);
}

function* watchListReadUserPost() {
  yield throttle(300, listReadUserPost.request, listReadUserPostSaga);
}

function* watchListReadHashTag() {
  yield takeLatest(listReadHashTagPost.request, listReadHashTagPostSaga);
}

function* watchListRead() {
  yield takeLatest(listReadPost.request, listReadPostSaga);
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

function* watchModifyPost() {
  yield takeLatest(modifyPost.request, function* (action) {
    const actionMeta = { actionList: [action.payload.url.postId] };
    yield call(modifyPostSaga, { ...action, meta: actionMeta });
  });
}

function* watchRemovePost() {
  yield takeLatest(removePost.request, function* (action) {
    const actionMeta = { actionList: [action.payload.postId] };
    yield call(removePostSaga, { ...action, meta: actionMeta });
    const rootState: RootState = yield select();
    const { status, data } = rootState.FETCH_STATUS[removePost.TYPE];
    if (status === 'SUCCESS') {
      yield put(removePostToMe(data.PostId));
    }
  });
}

function* watchCreateComment() {
  yield debounce(300, createComment.request, createCommentSaga);
}

function* watchRetweetPost() {
  yield debounce(300, retweetPost.request, retweetPostSaga);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchReadPost),
    fork(watchListReadUserPost),
    fork(watchListReadHashTag),
    fork(watchListRead),
    fork(watchCreatePost),
    fork(watchModifyPost),
    fork(watchRemovePost),
    fork(watchCreateComment),
    fork(watchRetweetPost),
  ]);
}
