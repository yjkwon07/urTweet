import React, { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, Button, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { postAction } from '@modules/post';
import { FormCreateComment } from '@modules/post/@types';
import { CREATE_COMMENT_SCHEMA } from '@modules/post/config';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { StyledForm } from './styles';

interface IProps {
  userId: number;
  postId: number;
}

const CommentForm = ({ userId, postId }: IProps) => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(postAction.createComment.TYPE, postId);

  const {
    control,
    handleSubmit: checkSubmit,
    errors,
    reset,
  } = useForm<FormCreateComment>({
    mode: 'onSubmit',
    resolver: yupResolver(CREATE_COMMENT_SCHEMA),
  });

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        await dispatch(
          postAction.createComment.asyncThunk(
            {
              url: { postId },
              body: { content: formData.content, userId },
            },
            { actionList: [postId] },
          ),
        );
        message.success('댓글이 등록되었습니다.');
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response?.data));
        }
      } finally {
        reset();
      }
    },
    [dispatch, postId, reset, userId],
  );

  return (
    <StyledForm onSubmitCapture={checkSubmit(handleSubmit)}>
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
      <div className="btn-group">
        <Button className="submit-button" type="primary" htmlType="submit" shape="round" loading={status === 'LOADING'}>
          댓글달기
        </Button>
      </div>
    </StyledForm>
  );
};

export default CommentForm;
