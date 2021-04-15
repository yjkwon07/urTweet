import { IUserURL } from '../@types/query';

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
