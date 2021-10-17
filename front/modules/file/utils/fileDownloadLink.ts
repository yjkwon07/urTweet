import { axiosSetting } from '@modules/client';

export default function fileDownloadLink(src: string, isOriginal = false) {
  if (isOriginal) {
    // eslint-disable-next-line no-param-reassign
    src = src.replace(/\/thumb\//, '/original/');
  }
  return `${axiosSetting.server()}/${src}`;
}
