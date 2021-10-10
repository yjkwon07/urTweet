import { axiosSetting } from '@modules/client';

export default function imageDownloadLink(src: string, isOriginal = false) {
  if (isOriginal) {
    // eslint-disable-next-line no-param-reassign
    src = src.replace(/\/thumb\//, '/original/');
  }
  return process.env.NODE_ENV === 'production' ? src : `${axiosSetting.server()}/${src}`;
}
