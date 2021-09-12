import React, { useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, Button, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { createComment } from '@modules/post';
import { FormComment } from '@modules/post/@types/type';
import { COMMENT_SCHEMA } from '@modules/post/config';
import isCustomAxiosError from '@utils/isCustomAxiosError';

interface IProps {
  userId: number;
  postId: number;
}

const CommentForm = ({ userId, postId }: IProps) => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(createComment.TYPE);

  const {
    control,
    handleSubmit: checkSubmit,
    errors,
    reset,
  } = useForm<FormComment>({
    mode: 'onSubmit',
    resolver: yupResolver(COMMENT_SCHEMA),
  });

  const handleSubmit = useMemo(() => {
    return checkSubmit(async (formData) => {
      try {
        await dispatch(
          createComment.asyncThunk({
            url: { postId },
            body: { content: formData.content, userId },
          }),
        );
        message.success('댓글이 등록되었습니다.');
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response?.data));
        }
      } finally {
        reset();
      }
    });
  }, [checkSubmit, dispatch, postId, reset, userId]);

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
          placeholder="댓글을 입력해 주세요."
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
