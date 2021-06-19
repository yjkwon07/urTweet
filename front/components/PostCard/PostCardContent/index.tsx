import React, { useMemo, useState } from 'react';

import { EditOutlined, UndoOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Form, message } from 'antd';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import regexifyString from 'regexify-string';
import * as yup from 'yup';

import { modifyPost } from '@modules/post';
import { IPost } from '@modules/post/@types/db';
import requiredLogin from '@utils/requiredLogin';
import { GET_HASHTAG_URL, PASS_HREF } from '@utils/urls';

import PostImages from '../PostImages';

const POST_SCHEMA = yup.object({
  content: yup.string().min(3, '게시글은 3자 이상 입력하여 주십시오.').required('게시글은 필수 입력 항목 입니다.'),
});

type FormData = yup.InferType<typeof POST_SCHEMA>;

export interface IProps {
  postId: IPost['id'];
  postContent: IPost['content'];
  images: IPost['Images'];
  editMode?: boolean;
  onCancleEditMode: () => void;
}

const PostCardContent = ({ postId, postContent, images, editMode = false, onCancleEditMode }: IProps) => {
  const dispatch = useDispatch();
  const { control, handleSubmit: checkSubmit, errors, reset } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(POST_SCHEMA),
    defaultValues: { content: postContent },
  });

  const [isLoading, setIsLoading] = useState(false);

  const HashTagPostContent = useMemo(
    () =>
      regexifyString({
        input: postContent,
        pattern: /(#[^\s#]+)/g,
        decorator(word, index) {
          if (word.match(/(#[^\s#]+)/)) {
            // word => #hasgh
            return (
              <Link href={GET_HASHTAG_URL(word.slice(1))} key={index} passHref>
                <a href={PASS_HREF}>{word}</a>
              </Link>
            );
          }
          return word;
        },
      }),
    [postContent],
  );

  const handleChangePost = useMemo(() => {
    return checkSubmit(async (formData) => {
      if (!requiredLogin()) {
        return;
      }
      try {
        setIsLoading(true);
        await dispatch(modifyPost.asyncTunk({ url: { postId }, body: { content: formData.content } }));
        message.success('게시글이 수정 되었습니다.');
      } catch (error) {
        message.error(JSON.stringify(error.response.data));
      } finally {
        reset();
        onCancleEditMode();
        setIsLoading(false);
      }
    });
  }, [checkSubmit, dispatch, onCancleEditMode, postId, reset]);

  return (
    <div>
      {editMode ? (
        <Form style={{ marginBottom: '20px' }} onFinish={handleChangePost}>
          <Form.Item
            validateStatus={errors.content ? 'error' : 'success'}
            help={errors.content ? errors.content?.message : ''}
            rules={[{ message: errors?.content?.message }]}
          >
            <Controller
              control={control}
              as={<Input.TextArea maxLength={140} autoSize={{ minRows: 3, maxRows: 5 }} />}
              name="content"
              id="edit_content"
              placeholder="게시글을 작성해 주세요."
            />
          </Form.Item>
          <Button.Group>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              <EditOutlined /> 수정
            </Button>
            <Button onClick={onCancleEditMode}>
              <UndoOutlined /> 취소
            </Button>
          </Button.Group>
        </Form>
      ) : (
        <>
          {HashTagPostContent}
          {images.length && <PostImages images={images} />}
        </>
      )}
    </div>
  );
};

export default PostCardContent;
