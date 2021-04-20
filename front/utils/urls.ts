export const PASS_HREF = 'PASS_HREF';

export const HOME_URL = '/';
export const PROFILE_URL = '/profile';
export const SIGNUP_URL = '/signup';
export const HASNTAG_URL = '/hashtag/:hashtag';
export const USER_URL = '/user/:id';

export const GET_HASHTAG_URL = (hashtag: string) => {
  return HASNTAG_URL.replace(':hashtag', hashtag);
};

export const GET_IMAGE_URL = (name: string) => {
  return `http://localhost:3065/${name}`;
};

export const GET_USER_URL = (id: string) => {
  return USER_URL.replace(':id', id);
};
