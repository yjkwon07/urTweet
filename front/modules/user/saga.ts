import { all, debounce, fork, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';

import { requestLogin, requestSignup, requestLogout, requestReadMyUser, requestModifyNickname } from './api/requestAPI';
import { login, signup, logout, readMyUser, modifyNickname } from './slice';

const loginSaga = createRequestSaga(login, requestLogin);
const logoutSaga = createRequestSaga(logout, requestLogout);
const signupSaga = createRequestSaga(signup, requestSignup);
const readMyUserSaga = createRequestSaga(readMyUser, requestReadMyUser);
const modifyNicknameSaga = createRequestSaga(modifyNickname, requestModifyNickname);

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

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogout), fork(watchSinup), fork(watchReadMyUser), fork(watchModifyNickname)]);
}
