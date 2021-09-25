import { axios } from '@modules/client';

/**
 * * 파일 업로드 POST
 * * url: /file/upload
 * * body: UploadFileBody
 * * res: UploadFileRes
 */
export type UploadFileBody = FormData;
export interface UploadFileRes extends CommonRes {
  resData: string[];
}
export function GET_FILE_UPLOAD_API() {
  return `/file/upload`;
}
export const requestUploadFile = (body: UploadFileBody) => {
  return axios.post<UploadFileRes>(GET_FILE_UPLOAD_API(), body);
};
