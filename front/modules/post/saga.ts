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
  infinteListReadPost,
} from './slice';

const uploadImagesSaga = createRequestSaga(uploadImages, uploadImages.requestAPI);
const likePostSaga = createRequestSaga(likePost, likePost.requestAPI);
const unlikePostSaga = createRequestSaga(unlikePost, unlikePost.requestAPI);
const readPostSaga = createRequestSaga(readPost, readPost.requestAPI);
const listReadUserPostSaga = createRequestSaga(listReadUserPost, listReadUserPost.requestAPI);
const listReadHashTagPostSaga = createRequestSaga(listReadHashTagPost, listReadHashTagPost.requestAPI);
const listReadPostSaga = createRequestSaga(listReadPost, listReadPost.requestAPI);
const infiniteListReadPostSaga = createRequestSaga(infinteListReadPost, infinteListReadPost.requestAPI);
const createPostSaga = createRequestSaga(createPost, createPost.requestAPI);
const modifyPostSaga = createRequestSaga(modifyPost, modifyPost.requestAPI);
const removePostSaga = createRequestSaga(removePost, removePost.requestAPI);
const createCommentSaga = createRequestSaga(createComment, createComment.requestAPI);
const retweetPostSaga = createRequestSaga(retweetPost, retweetPost.requestAPI);

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
  yield throttle(300, listReadUserPost.requset, listReadUserPostSaga);
}

function* watchListReadHashTag() {
  yield takeLatest(listReadHashTagPost.requset, listReadHashTagPostSaga);
}

function* watchListRead() {
  yield takeLatest(listReadPost.requset, listReadPostSaga);
}

function* watchInfiniteListRead() {
  yield throttle(300, infinteListReadPost.requset, infiniteListReadPostSaga);
}

function* watchCreatePost() {
  yield debounce(300, createPost.requset, function* (action) {
    yield call(createPostSaga, action);
    const rootState: RootState = yield select();
    const { status, data } = rootState.FETCH_STATUS[createPost.TYPE];
    if (status === 'SUCCESS') {
      yield put(addPostToMe(data.id));
    }
  });
}

function* watchModifyPost() {
  yield takeLatest(modifyPost.requset, function* (action) {
    const actionMeta = action;
    actionMeta.meta = { actionList: [action.payload.url.postId] };
    yield call(modifyPostSaga, actionMeta);
  });
}

function* watchRemovePost() {
  yield takeLatest(removePost.requset, function* (action) {
    const actionMeta = action;
    actionMeta.meta = { actionList: [action.payload.postId] };
    yield call(removePostSaga, actionMeta);
    const rootState: RootState = yield select();
    const { status, data } = rootState.FETCH_STATUS[removePost.TYPE];
    if (status === 'SUCCESS') {
      yield put(removePostToMe(data.PostId));
    }
  });
}

function* watchCreateComment() {
  yield debounce(300, createComment.requset, createCommentSaga);
}

function* watchRetweetPost() {
  yield debounce(300, retweetPost.requset, retweetPostSaga);
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
