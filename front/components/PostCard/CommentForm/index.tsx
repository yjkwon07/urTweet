import { useCallback, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Form, Input, Button, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { requestCreateComment, useFetchCreateCommentMutate } from '@modules/post';
import { FormCreateComment } from '@modules/post/@types';
import { CREATE_COMMENT_SCHEMA } from '@modules/post/config';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { StyledForm } from './styles';

interface IProps {
  userId: number;
  postId: number;
}

const CommentForm = ({ userId, postId }: IProps) => {
  const { successMutate } = useFetchCreateCommentMutate();
  const [isFetchCreateComment, setIsFetchCreateComment] = useState(false);

  const {
    control,
    handleSubmit: checkSubmit,
    formState: { errors },
    reset,
  } = useForm<FormCreateComment>({
    mode: 'onSubmit',
    resolver: yupResolver(CREATE_COMMENT_SCHEMA),
  });

  const handleSubmit = useCallback(
    async (formData: FormCreateComment) => {
      try {
        setIsFetchCreateComment(true);
        const {
          data: { resData },
        } = await requestCreateComment({
          url: { postId },
          body: { content: formData.content, userId },
        });
        await successMutate(resData, postId);
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data.resMsg));
        }
      } finally {
        setIsFetchCreateComment(false);
        reset();
      }
    },
    [successMutate, postId, reset, userId],
  );

  return (
    <StyledForm onSubmitCapture={checkSubmit(handleSubmit)}>
      <Form.Item
        htmlFor="content"
        validateStatus={errors.content ? 'error' : 'success'}
        help={errors.content ? errors.content?.message : ''}
        rules={[{ message: errors?.content?.message }]}
      >
        <Controller
          control={control}
          name="content"
          render={({ field: { value, onChange } }) => (
            <Input.TextArea
              id="content"
              value={value}
              onChange={onChange}
              maxLength={50}
              autoSize={{ minRows: 2, maxRows: 4 }}
              placeholder="댓글을 입력해 주세요."
            />
          )}
        />
      </Form.Item>
      <div className="btn-group">
        <Button className="submit-button" type="primary" htmlType="submit" shape="round" loading={isFetchCreateComment}>
          댓글달기
        </Button>
      </div>
    </StyledForm>
  );
};

export default CommentForm;
