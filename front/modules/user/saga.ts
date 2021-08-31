import { all, debounce, fork, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';

import {
  login,
  signup,
  logout,
  readMyUser,
  modifyNickname,
  follow,
  unFollow,
  listReadFollow,
  listReadFollowing,
  removeFollowerMe,
  readUser,
} from './slice';

const loginSaga = createRequestSaga(login, login.requestAPI);
const logoutSaga = createRequestSaga(logout, logout.requestAPI);
const signupSaga = createRequestSaga(signup, signup.requestAPI);
const readMyUserSaga = createRequestSaga(readMyUser, readMyUser.requestAPI);
const readUserSaga = createRequestSaga(readUser, readUser.requestAPI);
const modifyNicknameSaga = createRequestSaga(modifyNickname, modifyNickname.requestAPI);
const listReadFollowSaga = createRequestSaga(listReadFollow, listReadFollow.requestAPI);
const listReadFollowingSaga = createRequestSaga(listReadFollowing, listReadFollowing.requestAPI);
const followSaga = createRequestSaga(follow, follow.requestAPI);
const unFollowSaga = createRequestSaga(unFollow, unFollow.requestAPI);
const removeFollowerMeSaga = createRequestSaga(removeFollowerMe, removeFollowerMe.requestAPI);

function* watchLogIn() {
  yield takeLatest(login.request, loginSaga);
}

function* watchLogout() {
  yield takeLatest(logout.request, logoutSaga);
}

function* watchSignup() {
  yield debounce(300, signup.request, signupSaga);
}

function* watchReadMyUser() {
  yield takeLatest(readMyUser.request, readMyUserSaga);
}

function* watchReadUser() {
  yield takeLatest(readUser.request, readUserSaga);
}

function* watchModifyNickname() {
  yield takeLatest(modifyNickname.request, modifyNicknameSaga);
}

function* watchListReadFollow() {
  yield takeLatest(listReadFollow.request, listReadFollowSaga);
}

function* watchListReadFollowing() {
  yield takeLatest(listReadFollowing.request, listReadFollowingSaga);
}

function* watchFollow() {
  yield takeLatest(follow.request, followSaga);
}

function* watchUnFollow() {
  yield takeLatest(unFollow.request, unFollowSaga);
}

function* watchRemoveFollowerMe() {
  yield takeLatest(removeFollowerMe.request, removeFollowerMeSaga);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchReadMyUser),
    fork(watchReadUser),
    fork(watchModifyNickname),
    fork(watchListReadFollow),
    fork(watchListReadFollowing),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchRemoveFollowerMe),
  ]);
}
