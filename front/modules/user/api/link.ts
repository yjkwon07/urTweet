import { IListReadFollowingURL, IListReadFollowURL, IUserURL } from '../@types/query';

/**
 * * 로그인 유저 정보 조회 GET
 * * /user
 */
export function GET_READ_MY_USER_API() {
  return `/user`;
}

/**
 * * 유저 정보 조회 GET
 * * /user/:userId
 */
export function GET_READ_USER_API(url: IUserURL) {
  return `/user/${url.userId}`;
}

/**
 * * 로그인 POST
 * * /user/login
 */
export function GET_LOGIN_API() {
  return `/user/login`;
}

/**
 * * 로그아웃 POST
 * * /user/logout
 */
export function GET_LOGOUT_API() {
  return `/user/logout`;
}

/**
 * * 유저 등록 POST
 * * /user
 */
export function GET_SIGNUP_API() {
  return `/user`;
}

/**
 * * 닉네임 수정 PATCH
 * * /user/nickname
 */
export function GET_MODIFY_NICKNAME_API() {
  return `/user/nickname`;
}

/**
 * * 내가 팔로우 하는 유저 목록 조회 GET
 * * /user/followings
 */
export function GET_LIST_READ_FOLLOWING_API(url: IListReadFollowingURL) {
  return `/user/followings?pageSize=${url.pageSize || 0}`;
}

/**
 * * 나를 팔로워 하는 유저 목록 조회 GET
 * * /user/followers
 */
export function GET_LIST_READ_FOLLOW_API(url: IListReadFollowURL) {
  return `/user/followers?pageSize=${url.pageSize || 0}`;
}

/**
 * * 유저 팔로우 PATCH
 * * /user/:userId/follow
 */
export function GET_FOLLOW_API(url: IUserURL) {
  return `/user/${url.userId}/follow`;
}

/**
 * * 유저 팔로우 삭제 DELETE
 * * /user/:userId/follow
 */
export function GET_UNFOLLOW_API(url: IUserURL) {
  return `/user/${url.userId}/follow`;
}

/**
 * * 나를 팔로워 하는 유저 삭제 DELETE
 * * /user/follower/:userId
 */
export function GET_REMOVE_FOLLOWER_ME_API(url: IUserURL) {
  return `/user/follower/${url.userId}`;
}
