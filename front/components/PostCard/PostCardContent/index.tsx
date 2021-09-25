import React, { useCallback, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Form, message } from 'antd';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import regexifyString from 'regexify-string';

import { useFetchStatus } from '@modules/fetchStatus';
import { postAction } from '@modules/post';
import { FormEditPost, Image } from '@modules/post/@types';
import { EDIT_POST_SCHEMA } from '@modules/post/config';
import isCustomAxiosError from '@utils/isCustomAxiosError';
import { GET_HASHTAG_URL, PASS_HREF } from '@utils/urls';

import PostImages from '../PostImages';
import { StyledForm } from './styles';

export interface IProps {
  postId: number;
  postContent: string;
  imageList: Image[];
  editMode?: boolean;
  onCancelEditMode: () => void;
}

const PostCardContent = ({ postId, postContent, imageList, editMode = false, onCancelEditMode }: IProps) => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(postAction.updatePost.TYPE, postId);

  const {
    control,
    handleSubmit: checkSubmit,
    errors,
    reset,
  } = useForm<FormEditPost>({
    mode: 'onSubmit',
    resolver: yupResolver(EDIT_POST_SCHEMA),
    defaultValues: { content: postContent },
  });

  const HashTagPostContent = useMemo(
    () =>
      regexifyString({
        input: postContent,
        pattern: /(#[^\s#]+)/g,
        decorator(word, index) {
          if (word.match(/(#[^\s#]+)/)) {
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

  const handleChangePost = useCallback(
    async (formData) => {
      try {
        await dispatch(
          postAction.updatePost.asyncThunk(
            { url: { postId }, body: { content: formData.content } },
            { actionList: [postId] },
          ),
        );
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data.resMsg));
        }
      } finally {
        reset({});
        onCancelEditMode();
      }
    },
    [dispatch, onCancelEditMode, postId, reset],
  );

  return (
    <div>
      {editMode ? (
        <StyledForm onSubmitCapture={checkSubmit(handleChangePost)}>
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
          <div className="btn-group">
            <Button className="submit-button mr-5" type="primary" htmlType="submit" loading={status === 'LOADING'}>
              수정
            </Button>
            <Button className="cancel-button" onClick={onCancelEditMode}>
              취소
            </Button>
          </div>
        </StyledForm>
      ) : (
        <>
          <div className="mb-10">{HashTagPostContent}</div>
          {!!imageList.length && <PostImages imageList={imageList} />}
        </>
      )}
    </div>
  );
};

export default PostCardContent;
