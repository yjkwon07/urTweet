import React, { useMemo, VFC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, Button, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

import { useFetchStatus } from '@modules/fetchStatus';
import { createComment } from '@modules/post';
import { IPost } from '@modules/post/@types/db';
import { userSelector } from '@modules/user';

export interface IProps {
  data: IPost;
}

const COMMENT_SCHEMA = yup.object({
  content: yup.string().min(3, '댓글은 3자 이상 입력하여 주십시오.').required('댓글은 필수 입력 항목 입니다.'),
});

type FormData = yup.InferType<typeof COMMENT_SCHEMA>;

const CommentForm: VFC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(createComment.TYPE);
  const myData = useSelector(userSelector.myData);
  const { control, handleSubmit: checkSubmit, errors, reset } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(COMMENT_SCHEMA),
  });

  const handleSubmit = useMemo(() => {
    return checkSubmit(async (formData) => {
      if (!myData?.id) return;
      try {
        await dispatch(
          createComment.asyncTunk({
            url: { postId: data.id.toString() },
            body: { content: formData.content, userId: myData.id },
          }),
        );
        message.success('댓글이 등록되었습니다.').then();
      } catch (error) {
        message.error(JSON.stringify(error.response.data)).then();
      } finally {
        reset();
      }
    });
  }, [checkSubmit, dispatch, myData, data?.id, reset]);

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        validateStatus={errors.content ? 'error' : 'success'}
        help={errors.content ? errors.content?.message : ''}
        rules={[{ message: errors?.content?.message }]}
      >
        <Controller
          control={control}
          as={<Input.TextArea maxLength={50} autoSize={{ minRows: 2, maxRows: 4 }} />}
          name="content"
          id="content"
          placeholder="어떤 신기한 일이 있었나요?"
          defaultValue=""
        />
      </Form.Item>
      <div style={{ position: 'relative', margin: 0 }}>
        <Button
          style={{ position: 'absolute', right: 0, top: '-15px', zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={status === 'LOADING'}
        >
          댓글달기
        </Button>
      </div>
    </Form>
  );
};

export default CommentForm;
