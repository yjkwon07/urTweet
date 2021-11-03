export const PASS_HREF = 'PASS_HREF';

export const PROFILE_URL = '/profile';
export const SIGNUP_URL = '/signup';
export const USER_URL = '/user/[id]';

export const GET_USER_URL = (id: string) => {
  return USER_URL.replace('[id]', id);
};
