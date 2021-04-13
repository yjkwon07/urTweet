export const PASS_HREF = 'PASS_HREF';

export const HOME_URL = '/';
export const PROFILE_URL = '/profile';
export const SIGNUP_URL = '/signup';
export const HASNTAG_URL = '/hashtag/:hashtag';

export const GET_HASHTAG_URL = (hashtag: string) => {
  return HASNTAG_URL.replace(':hashtag', hashtag);
};
