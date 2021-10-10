import { all, call, debounce, fork, put, select, takeLatest } from 'redux-saga/effects';

import { fetchStatusAction } from '@modules/fetchStatus';
import { createRequestSaga } from '@modules/helper';

import {
  login,
  signup,
  logout,
  readMyUser,
  updateMyUser,
  follow,
  unFollow,
  listReadFollow,
  listReadFollowing,
  removeFollowerMe,
  readUser,
} from './slice';

import { userAction } from '.';

const loginSaga = createRequestSaga(login, login.requestAPI);
const logoutSaga = createRequestSaga(logout, logout.requestAPI);
const signupSaga = createRequestSaga(signup, signup.requestAPI);
const readMyUserSaga = createRequestSaga(readMyUser, readMyUser.requestAPI);
const readUserSaga = createRequestSaga(readUser, readUser.requestAPI);
const updateMyUserSaga = createRequestSaga(updateMyUser, updateMyUser.requestAPI);
const listReadFollowSaga = createRequestSaga(listReadFollow, listReadFollow.requestAPI);
const listReadFollowingSaga = createRequestSaga(listReadFollowing, listReadFollowing.requestAPI);
const followSaga = createRequestSaga(follow, follow.requestAPI);
const unFollowSaga = createRequestSaga(unFollow, unFollow.requestAPI);
const removeFollowerMeSaga = createRequestSaga(removeFollowerMe, removeFollowerMe.requestAPI);

function* watchLogIn() {
  yield takeLatest(login.request, function* (action) {
    yield call(loginSaga, action);
    const rootState: RootState = yield select();
    const { status, data } = rootState.FETCH_STATUS[userAction.login.TYPE];
    if (status === 'SUCCESS') {
      yield put(fetchStatusAction.successFetchStatus({ type: userAction.readMyUser.TYPE, data }));
      yield put(userAction.updateMyInfo(data.resData));
    }
  });
}

function* watchLogout() {
  yield takeLatest(logout.request, function* (action) {
    yield call(logoutSaga, action);
    const rootState: RootState = yield select();
    const { status } = rootState.FETCH_STATUS[userAction.logout.TYPE];
    if (status === 'SUCCESS') {
      yield put(fetchStatusAction.initFetchStatus({ type: userAction.readMyUser.TYPE }));
      yield put(userAction.myInfoReset());
    }
  });
}

function* watchSignup() {
  yield debounce(300, signup.request, signupSaga);
}

function* watchReadMyUser() {
  yield debounce(300, readMyUser.request, readMyUserSaga);
}

function* watchReadUser() {
  yield takeLatest(readUser.request, readUserSaga);
}

function* watchModifyNickname() {
  yield takeLatest(updateMyUser.request, updateMyUserSaga);
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
