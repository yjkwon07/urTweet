import { all, debounce, fork, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';

import { requestLogin, requestSignup, requestLogout } from './api/requestAPI';
import { login, signup, logout } from './slice';

const loginSaga = createRequestSaga(login, requestLogin);
const logoutSaga = createRequestSaga(logout, requestLogout);
const signupSaga = createRequestSaga(signup, requestSignup);

function* watchLogIn() {
  yield takeLatest(login.requset, loginSaga);
}

function* watchLogout() {
  yield takeLatest(logout.requset, logoutSaga);
}

function* watchSinup() {
  yield debounce(300, signup.requset, signupSaga);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogout), fork(watchSinup)]);
}
