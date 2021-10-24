import { all, debounce, fork, put, takeLatest } from 'redux-saga/effects';

import { fetchStatusAction } from '@modules/fetchStatus';
import { createFetchSaga } from '@modules/helper';

import {
  requestFollow,
  requestListReadFollow,
  requestListReadFollowing,
  requestLogin,
  requestLogout,
  requestReadMyUser,
  requestReadUser,
  requestRemoveFollowerMe,
  requestSignup,
  requestUnfollow,
  requestUpdateMyUser,
} from './api';
import { userAction } from './slice';

function* watchLogIn() {
  yield takeLatest(
    userAction.fetchLogin.request,
    createFetchSaga(userAction.fetchLogin, requestLogin, function* (data) {
      yield put(fetchStatusAction.successFetchStatus({ type: userAction.fetchReadMyUser.TYPE, response: data }));
      yield put(userAction.updateMyInfo(data.resData));
    }),
  );
}

function* watchLogout() {
  yield takeLatest(
    userAction.fetchLogout.request,
    createFetchSaga(userAction.fetchLogout, requestLogout, function* () {
      yield put(fetchStatusAction.initFetchStatus({ type: userAction.fetchReadMyUser.TYPE }));
      yield put(userAction.myInfoReset());
    }),
  );
}

function* watchSignup() {
  yield debounce(300, userAction.fetchSignup.request, createFetchSaga(userAction.fetchSignup, requestSignup));
}

function* watchReadMyUser() {
  yield debounce(
    400,
    userAction.fetchReadMyUser.request,
    createFetchSaga(userAction.fetchReadMyUser, requestReadMyUser),
  );
}

function* watchReadUser() {
  yield takeLatest(userAction.fetchReadUser.request, createFetchSaga(userAction.fetchReadUser, requestReadUser));
}

function* watchModifyNickname() {
  yield takeLatest(
    userAction.fetchUpdateMyUser.request,
    createFetchSaga(userAction.fetchUpdateMyUser, requestUpdateMyUser),
  );
}

function* watchListReadFollow() {
  yield takeLatest(
    userAction.fetchListReadFollow.request,
    createFetchSaga(userAction.fetchListReadFollow, requestListReadFollow),
  );
}

function* watchListReadFollowing() {
  yield takeLatest(
    userAction.fetchListReadFollowing.request,
    createFetchSaga(userAction.fetchListReadFollowing, requestListReadFollowing),
  );
}

function* watchFollow() {
  yield takeLatest(userAction.fetchFollow.request, createFetchSaga(userAction.fetchFollow, requestFollow));
}

function* watchUnFollow() {
  yield takeLatest(userAction.fetchUnFollow.request, createFetchSaga(userAction.fetchUnFollow, requestUnfollow));
}

function* watchRemoveFollowerMe() {
  yield takeLatest(
    userAction.fetchRemoveFollowerMe.request,
    createFetchSaga(userAction.fetchRemoveFollowerMe, requestRemoveFollowerMe),
  );
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
