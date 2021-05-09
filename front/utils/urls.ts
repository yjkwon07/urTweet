import { axiosSetting } from '@modules/client';

export const PASS_HREF = 'PASS_HREF';

export const HOME_URL = '/';
export const POST_URL = '/post/[id]';
export const PROFILE_URL = '/profile';
export const SIGNUP_URL = '/signup';
export const HASNTAG_URL = '/hashtag/:hashtag';
export const USER_URL = '/user/[id]';

export const GET_HASHTAG_URL = (hashtag: string) => {
  return HASNTAG_URL.replace(':hashtag', hashtag);
};

export const GET_IMAGE_URL = (name: string) => {
  return `${axiosSetting.server()}/${name}`;
};

export const GET_USER_URL = (id: string) => {
  return USER_URL.replace('[id]', id);
};

export const GET_POST_URL = (id: string) => {
  return POST_URL.replace('[id]', id);
};
