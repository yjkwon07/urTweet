import React, { useMemo } from 'react';

import { EditOutlined, UndoOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Form, message } from 'antd';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import regexifyString from 'regexify-string';

import { useFetchStatus } from '@modules/fetchStatus';
import { modifyPost } from '@modules/post';
import { FormUpdatePost } from '@modules/post/@types';
import { IIMage } from '@modules/post/@types/db';
import { UPDATE_POST_SCHEMA } from '@modules/post/config';
import isCustomAxiosError from '@utils/isCustomAxiosError';
import { GET_HASHTAG_URL, PASS_HREF } from '@utils/urls';

import PostImages from '../PostImages';

export interface IProps {
  postId: number;
  postContent: string;
  imageList: IIMage[];
  editMode?: boolean;
  onCancelEditMode: () => void;
}

const PostCardContent = ({ postId, postContent, imageList, editMode = false, onCancelEditMode }: IProps) => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(modifyPost.TYPE, postId);

  const {
    control,
    handleSubmit: checkSubmit,
    errors,
    reset,
  } = useForm<FormUpdatePost>({
    mode: 'onSubmit',
    resolver: yupResolver(UPDATE_POST_SCHEMA),
    defaultValues: { content: postContent },
  });

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
      try {
        await dispatch(
          modifyPost.asyncThunk({ url: { postId }, body: { content: formData.content } }, { actionList: [postId] }),
        );
        message.success('게시글이 수정 되었습니다.');
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response?.data));
        }
      } finally {
        reset();
        onCancelEditMode();
      }
    });
  }, [checkSubmit, dispatch, onCancelEditMode, postId, reset]);

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
              as={
                <Input.TextArea
                  maxLength={140}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  showCount
                  defaultValue={postContent}
                />
              }
              name="content"
              id="edit_content"
              placeholder="게시글을 작성해 주세요."
            />
          </Form.Item>
          <Button.Group>
            <Button type="primary" htmlType="submit" loading={status === 'LOADING'}>
              <EditOutlined /> 수정
            </Button>
            <Button onClick={onCancelEditMode}>
              <UndoOutlined /> 취소
            </Button>
          </Button.Group>
        </Form>
      ) : (
        <>
          {HashTagPostContent}
          <div style={{ marginTop: 10 }} />
          {!!imageList.length && <PostImages imageList={imageList} />}
        </>
      )}
    </div>
  );
};

export default PostCardContent;
