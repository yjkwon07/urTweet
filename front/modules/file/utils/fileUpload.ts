import { requestUploadFile } from '../api';

/**
 * * 파일 업로드
 */
export default async function fileUpload(fileList: FileList) {
  const imageFormData = new FormData();
  [].forEach.call(fileList, (file) => {
    imageFormData.append('file', file);
  });
  const {
    data: { resData },
  } = await requestUploadFile(imageFormData);
  return resData;
}
