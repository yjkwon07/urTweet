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
} from './api/requestAPI';
import { login, signup, logout, readMyUser, modifyNickname, follow, unFollow } from './slice';

const loginSaga = createRequestSaga(login, requestLogin);
const logoutSaga = createRequestSaga(logout, requestLogout);
const signupSaga = createRequestSaga(signup, requestSignup);
const readMyUserSaga = createRequestSaga(readMyUser, requestReadMyUser);
const modifyNicknameSaga = createRequestSaga(modifyNickname, requestModifyNickname);
const followSaga = createRequestSaga(follow, requestFollow);
const unFollowSaga = createRequestSaga(unFollow, requestUnfollow);

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

function* watchFollow() {
  yield takeLatest(follow.requset, followSaga);
}

function* watchUnFollow() {
  yield takeLatest(unFollow.requset, unFollowSaga);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogout),
    fork(watchSinup),
    fork(watchReadMyUser),
    fork(watchModifyNickname),
    fork(watchFollow),
    fork(watchUnFollow),
  ]);
}
