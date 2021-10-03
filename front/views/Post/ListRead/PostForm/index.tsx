import React, { useCallback, useRef, useState } from 'react';

import { FileImageTwoTone } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, message, Image } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { fileUpload } from '@modules/file';
import imageDownloadLink from '@modules/file/utils/imageDownloadLink';
import { postAction, EDIT_POST_SCHEMA } from '@modules/post';
import { FormEditPost } from '@modules/post/@types';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { StyledCard, StyledForm } from './styles';

const PostForm = () => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit: checkSubmit,
    errors,
    reset,
  } = useForm<FormEditPost>({
    mode: 'onSubmit',
    resolver: yupResolver(EDIT_POST_SCHEMA),
    defaultValues: { content: '' },
  });

  const [imagePathList, setImagePathList] = useState<string[]>([]);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        await dispatch(postAction.createPost.asyncThunk({ content: formData.content, image: imagePathList }));
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data.resMsg));
        }
      } finally {
        reset();
        setImagePathList([]);
      }
    },
    [dispatch, imagePathList, reset],
  );

  const handleClickImageUpload = useCallback(() => {
    if (imageInput.current) imageInput.current.click();
  }, []);

  const handleChangeImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 5) {
      message.info('이미지는 최대 4개까지 허용됩니다.');
      return;
    }
    try {
      if (e.target.files && e.target.files.length) {
        const filePathList = await fileUpload(e.target.files);
        setImagePathList(filePathList);
        if (imageInput.current) imageInput.current.value = '';
      }
    } catch (error) {
      if (isCustomAxiosError(error)) {
        message.error(JSON.stringify(error.response.data.resMsg));
      }
    }
  }, []);

  const handleRemoveImage = useCallback(
    (filePath) => () => {
      setImagePathList((data) => data.filter((name) => name !== filePath));
    },
    [],
  );

  return (
    <StyledCard>
      <StyledForm encType="multipart/form-data" onSubmitCapture={checkSubmit(handleSubmit)}>
        <div className="content">
          <Form.Item
            className="form"
            name="content"
            validateStatus={errors.content ? 'error' : 'success'}
            help={errors.content ? errors.content?.message : ''}
            rules={[{ message: errors?.content?.message }]}
          >
            <Controller
              control={control}
              as={<Input.TextArea maxLength={140} autoSize={{ minRows: 3, maxRows: 5 }} showCount defaultValue="" />}
              name="content"
              id="content"
              placeholder="게시글을 작성해 주세요."
            />
          </Form.Item>
        </div>

        <div className="actions">
          <input type="file" name="image" multiple hidden ref={imageInput} onChange={handleChangeImage} />
          <Button className="file" shape="circle" onClick={handleClickImageUpload} icon={<FileImageTwoTone />} />
          <Button className="submit" type="primary" shape="round" htmlType="submit">
            Tweet
          </Button>
        </div>

        <div className="image_preview">
          <Image.PreviewGroup>
            {imagePathList.map((filePath) => (
              <div key={filePath} className="wrapper">
                <Image width={150} height={150} src={imageDownloadLink(filePath, true)} alt="" />
                <div className="button_wrapper">
                  <Button type="primary" danger onClick={handleRemoveImage(filePath)}>
                    제거
                  </Button>
                </div>
              </div>
            ))}
          </Image.PreviewGroup>
        </div>
      </StyledForm>
    </StyledCard>
  );
};

export default PostForm;
