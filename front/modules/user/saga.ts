import { all, debounce, fork, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';

import { requestLogin as login, requestSignup as signup, requestLogout as logout } from './api/requestAPI';
import { requsetLogin, requestSignup, requsetLogout } from './slice';

const loginSaga = createRequestSaga(requsetLogin, login);
const logoutSaga = createRequestSaga(requsetLogout, logout);
const signupSaga = createRequestSaga(requestSignup, signup);

function* watchLogIn() {
  yield takeLatest(requsetLogin.requset, loginSaga);
}

function* watchLogout() {
  yield takeLatest(requsetLogout.requset, logoutSaga);
}

function* watchSinup() {
  yield debounce(300, requestSignup.requset, signupSaga);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogout), fork(watchSinup)]);
}
