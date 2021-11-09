import { isSSR } from './isSSR';

const USER_ID = 'userId';

export function getUserId() {
  if (isSSR()) return '';
  return localStorage.getItem(USER_ID) || '';
}

export function setUserId(userId: string) {
  localStorage.setItem(USER_ID, userId || getUserId());
}

export function removeUserId() {
  localStorage.setItem(USER_ID, '');
}
