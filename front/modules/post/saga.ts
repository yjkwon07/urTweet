import { all, fork, takeLatest, throttle } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';

import {
  requestUploadPostImages,
  requestModifyLikePost,
  requestRemoveLikePost,
  requestReadPost,
  requestListReadUserPost,
  requestListReadPost,
  requestListReadHashtagPost,
  requestCreatePost,
  requestLikePost,
  requestUnlikePost,
  requestCreateComment,
  requestCreatePostRetweet,
} from './api/requestAPI';
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
  infinteListReadPost,
} from './slice';

const uploadImagesSaga = createRequestSaga(uploadImages, requestUploadPostImages);
const likePostSaga = createRequestSaga(likePost, requestModifyLikePost);
const unlikePostSaga = createRequestSaga(unlikePost, requestRemoveLikePost);
const readPostSaga = createRequestSaga(readPost, requestReadPost);
const listReadUserPostSaga = createRequestSaga(listReadUserPost, requestListReadUserPost);
const listReadHashTagPostSaga = createRequestSaga(listReadHashTagPost, requestListReadHashtagPost);
const listReadPostSaga = createRequestSaga(listReadPost, requestListReadPost);
const infiniteListReadPostSaga = createRequestSaga(infinteListReadPost, requestListReadPost);
const createPostSaga = createRequestSaga(createPost, requestCreatePost);
const modifyPostSaga = createRequestSaga(modifyPost, requestLikePost);
const removePostSaga = createRequestSaga(removePost, requestUnlikePost);
const createCommentSaga = createRequestSaga(createComment, requestCreateComment);
const retweetPostSaga = createRequestSaga(retweetPost, requestCreatePostRetweet);

function* watchUploadImages() {
  yield takeLatest(uploadImages.requset, uploadImagesSaga);
}

function* watchLikePost() {
  yield takeLatest(likePost.requset, likePostSaga);
}

function* watchUnlikePost() {
  yield takeLatest(unlikePost.requset, unlikePostSaga);
}

function* watchReadPost() {
  yield takeLatest(readPost.requset, readPostSaga);
}

function* watchListReadUserPost() {
  yield takeLatest(listReadUserPost.requset, listReadUserPostSaga);
}

function* watchListReadHashTag() {
  yield takeLatest(listReadHashTagPost.requset, listReadHashTagPostSaga);
}

function* watchListRead() {
  yield takeLatest(listReadPost.requset, listReadPostSaga);
}

function* watchInfiniteListRead() {
  yield throttle(5000, infinteListReadPost.requset, infiniteListReadPostSaga);
}

function* watchCreatePost() {
  yield takeLatest(createPost.requset, createPostSaga);
}

function* watchModifyPost() {
  yield takeLatest(modifyPost.requset, modifyPostSaga);
}

function* watchRemovePost() {
  yield takeLatest(removePost.requset, removePostSaga);
}

function* watchCreateComment() {
  yield takeLatest(createComment.requset, createCommentSaga);
}

function* watchRetweetPost() {
  yield takeLatest(retweetPost.requset, retweetPostSaga);
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
    fork(watchInfiniteListRead),
    fork(watchCreatePost),
    fork(watchModifyPost),
    fork(watchRemovePost),
    fork(watchCreateComment),
    fork(watchRetweetPost),
  ]);
}
