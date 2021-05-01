import { all, debounce, fork, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';

import {
  requestLogin,
  requestSignup,
  requestLogout,
  requestReadMyUser,
  requestModifyNickname,
  requestFollow,
  requestUnfollow,
  requestListReadFollow,
  requestListReadFollowing,
  requestRemoveFollowerMe,
} from './api/requestAPI';
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
} from './slice';

const loginSaga = createRequestSaga(login, requestLogin);
const logoutSaga = createRequestSaga(logout, requestLogout);
const signupSaga = createRequestSaga(signup, requestSignup);
const readMyUserSaga = createRequestSaga(readMyUser, requestReadMyUser);
const modifyNicknameSaga = createRequestSaga(modifyNickname, requestModifyNickname);
const listReadfollowSaga = createRequestSaga(listReadFollow, requestListReadFollow);
const listReadfollowingSaga = createRequestSaga(listReadFollowing, requestListReadFollowing);
const followSaga = createRequestSaga(follow, requestFollow);
const unFollowSaga = createRequestSaga(unFollow, requestUnfollow);
const removeFollowerMeSaga = createRequestSaga(removeFollowerMe, requestRemoveFollowerMe);

function* watchLogIn() {
  yield takeLatest(login.requset, loginSaga);
}

function* watchLogout() {
  yield takeLatest(logout.requset, logoutSaga);
}

function* watchSinup() {
  yield debounce(300, signup.requset, signupSaga);
}

function* watchReadMyUser() {
  yield takeLatest(readMyUser.requset, readMyUserSaga);
}

function* watchModifyNickname() {
  yield takeLatest(modifyNickname.requset, modifyNicknameSaga);
}

function* watchListReadFollow() {
  yield takeLatest(listReadFollow.requset, listReadfollowSaga);
}

function* watchListReadFollowing() {
  yield takeLatest(listReadFollowing.requset, listReadfollowingSaga);
}

function* watchFollow() {
  yield takeLatest(follow.requset, followSaga);
}

function* watchUnFollow() {
  yield takeLatest(unFollow.requset, unFollowSaga);
}

function* watchRemoveFollowerMe() {
  yield debounce(300, removeFollowerMe.requset, removeFollowerMeSaga);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogout),
    fork(watchSinup),
    fork(watchReadMyUser),
    fork(watchModifyNickname),
    fork(watchListReadFollow),
    fork(watchListReadFollowing),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchRemoveFollowerMe),
  ]);
}
