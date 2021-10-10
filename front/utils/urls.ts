export const PASS_HREF = 'PASS_HREF';

export const HOME_URL = '/';
export const POST_URL = '/post/[id]';
export const PROFILE_URL = '/profile';
export const SIGNUP_URL = '/signup';
export const USER_URL = '/user/[id]';

export const GET_USER_URL = (id: string) => {
  return USER_URL.replace('[id]', id);
};

export const GET_POST_URL = (id: string) => {
  return POST_URL.replace('[id]', id);
};
