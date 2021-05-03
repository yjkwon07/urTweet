import React, { useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Form, message } from 'antd';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { modifyPost } from '@modules/post';
import { IPost } from '@modules/post/@types/db';
import { GET_HASHTAG_URL, PASS_HREF } from '@utils/urls';

const POST_SCHEMA = yup.object({
  content: yup.string().min(3, '게시글은 3자 이상 입력하여 주십시오.').required('게시글은 필수 입력 항목 입니다.'),
});

type FormData = yup.InferType<typeof POST_SCHEMA>;

export interface IProps {
  postId: IPost['id'];
  postContent: IPost['content'];
  editMode?: boolean;
  isUpdateLoading?: boolean;
  onCancleEditMode: () => void;
}

const PostCardContent = ({
  postId,
  postContent,
  editMode = false,
  isUpdateLoading = false,
  onCancleEditMode,
}: IProps) => {
  const dispatch = useDispatch();
  const { control, handleSubmit: checkSubmit, errors, reset } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(POST_SCHEMA),
    defaultValues: { content: postContent },
  });

  const handleChangePost = useMemo(() => {
    return checkSubmit(async (formData) => {
      reset();
      try {
        dispatch(modifyPost.requset({ url: { postId }, body: { content: formData.content } }));
        message.success('게시글이 수정 되었습니다.');
      } catch (error) {
        message.error(JSON.stringify(error.response.data));
      } finally {
        onCancleEditMode();
      }
    });
  }, [checkSubmit, dispatch, onCancleEditMode, postId, reset]);

  return (
    <div>
      {editMode ? (
        <Form style={{ marginBottom: '20px' }} onFinish={handleChangePost}>
          <Form.Item
            name="content"
            validateStatus={errors.content ? 'error' : 'success'}
            help={errors.content ? errors.content?.message : ''}
            rules={[{ message: errors?.content?.message }]}
          >
            <Controller
              control={control}
              as={<Input.TextArea maxLength={140} autoSize={{ minRows: 3, maxRows: 5 }} />}
              name="content"
              id="content"
              placeholder="게시글을 작성해 주세요."
            />
          </Form.Item>
          <Button.Group>
            <Button htmlType="submit" loading={isUpdateLoading}>
              수정
            </Button>
            <Button type="dashed" onClick={onCancleEditMode}>
              취소
            </Button>
          </Button.Group>
        </Form>
      ) : (
        postContent.split(/(#[^\s#]+)/g).map((word, i) => {
          if (word.match(/(#[^\s#]+)/)) {
            return (
              <Link href={GET_HASHTAG_URL(word.slice(1))} key={i} passHref>
                <a href={PASS_HREF}>{word}</a>
              </Link>
            );
          }
          return word;
        })
      )}
    </div>
  );
};

export default PostCardContent;
