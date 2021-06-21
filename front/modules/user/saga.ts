import { all, call, debounce, fork, takeLatest } from 'redux-saga/effects';

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
const listReadfollowSaga = createRequestSaga(listReadFollow, listReadFollow.requestAPI);
const listReadfollowingSaga = createRequestSaga(listReadFollowing, listReadFollowing.requestAPI);
const followSaga = createRequestSaga(follow, follow.requestAPI);
const unFollowSaga = createRequestSaga(unFollow, unFollow.requestAPI);
const removeFollowerMeSaga = createRequestSaga(removeFollowerMe, removeFollowerMe.requestAPI);

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

function* watchReadUser() {
  yield takeLatest(readUser.requset, readUserSaga);
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
  yield takeLatest(follow.requset, function* (action) {
    const actionMeta = action;
    actionMeta.meta = { actionList: [action.payload.userId] };
    yield call(followSaga, actionMeta);
  });
}

function* watchUnFollow() {
  yield takeLatest(unFollow.requset, function* (action) {
    const actionMeta = action;
    actionMeta.meta = { actionList: [action.payload.userId] };
    yield call(unFollowSaga, actionMeta);
  });
}

function* watchRemoveFollowerMe() {
  yield takeLatest(removeFollowerMe.requset, removeFollowerMeSaga);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogout),
    fork(watchSinup),
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
