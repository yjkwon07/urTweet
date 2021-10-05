import * as yup from 'yup';

export const LOGIN_SCHEMA = yup.object({
  email: yup.string().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  password: yup.string().required('비밀번호는 필수 입력입니다.'),
});

export const NICKNAME_SCHEMA = yup.object({
  email: yup.string().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  nickname: yup.string().required('닉네임은 필수 입력 항목 입니다.'),
});
