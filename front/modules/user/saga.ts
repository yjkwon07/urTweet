import { all, fork, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from '@modules/helper';

import { requestLogin as login, requestSignup as signup } from './api/requestAPI';
import { requsetLogin, requestSignup } from './slice';

const logIn = createRequestSaga(requsetLogin, login);
const signupSaga = createRequestSaga(requestSignup, signup);

function* watchLogIn() {
  yield takeLatest(requsetLogin.requset, logIn);
}

function* watchSinup() {
  yield takeLatest(requestSignup.requset, signupSaga);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchSinup)]);
}
