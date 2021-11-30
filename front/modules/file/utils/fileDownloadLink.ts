import { axiosSetting } from '@modules/client';

export default function fileDownloadLink(fileLink: string, isOriginal = false) {
  let src = fileLink;
  if (isOriginal) {
    src = src.replace(/\/thumb\//, '/original/');
  }
  return `${axiosSetting.server()}/${src}`;
}
