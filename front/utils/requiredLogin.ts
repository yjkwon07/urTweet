import { message } from 'antd';

import { getUserId } from './auth';

export default function requiredLogin() {
  if (!getUserId()) {
    message.warn('로그인이 필요합니다.');
    return false;
  }
  return true;
}
