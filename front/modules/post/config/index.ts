import * as yup from 'yup';

export const CREATE_COMMENT_SCHEMA = yup.object({
  content: yup.string().min(3, '댓글은 3자 이상 입력하여 주십시오.').required('댓글은 필수 입력 항목 입니다.'),
});

export const EDIT_POST_SCHEMA = yup.object({
  content: yup
    .string()
    .min(3, '게시글은 3자 이상 입력하여 주십시오.')
    .max(140, '게시글은 140자 제한 입니다.')
    .required('게시글은 필수 입력 항목 입니다.'),
  image: yup.array().of(yup.string().required()),
});
