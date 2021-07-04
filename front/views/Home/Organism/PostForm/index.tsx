import React, { useCallback, useRef, useState } from 'react';

import { FileImageTwoTone } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, message, Image, Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { useAppDispatch } from '@hooks/useAppRedux';
import { createPost, uploadImages } from '@modules/post';
import { IUploadImagePathRes } from '@modules/post/api/requestAPI';
import { userSelector } from '@modules/user';
import { GET_IMAGE_URL, GET_USER_URL, PASS_HREF } from '@utils/urls';

import { FormWrapper } from './styles';

const POST_SCHEMA = yup.object({
  content: yup
    .string()
    .min(3, '게시글은 3자 이상 입력하여 주십시오.')
    .max(140, '게시글은 140자 제한 입니다.')
    .required('게시글은 필수 입력 항목 입니다.'),
});

type FormData = yup.InferType<typeof POST_SCHEMA>;

const PostForm = () => {
  const dispatch = useAppDispatch();
  const myData = useSelector(userSelector.myData);
  const { control, handleSubmit: checkSubmit, errors, reset } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(POST_SCHEMA),
    defaultValues: { content: '' },
  });

  const [imageListPath, setImageListPath] = useState<IUploadImagePathRes>([]);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    checkSubmit(async (formData) => {
      try {
        await dispatch(createPost.asyncTunk({ content: formData.content, image: imageListPath }));
        message.success('게시글이 등록되었습니다.');
      } catch (error) {
        message.error(JSON.stringify(error.response.data));
      } finally {
        reset();
        setImageListPath([]);
      }
    })();
  }, [checkSubmit, dispatch, imageListPath, reset]);

  const handleClickImageUpload = useCallback(() => {
    if (imageInput.current) imageInput.current.click();
  }, []);

  const handleChangeImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length >= 5) {
        message.info('이미지는 최대 4개까지 허용됩니다.');
        return;
      }
      try {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (file) => {
          imageFormData.append('image', file);
        });
        const listPath = await dispatch(uploadImages.asyncTunk(imageFormData));
        setImageListPath(listPath);
      } catch (error) {
        message.error(JSON.stringify(error.response.data));
      }
    },
    [dispatch],
  );

  const handleRemoveImage = useCallback(
    (filePath) => () => {
      setImageListPath((data) => data.filter((name) => name !== filePath));
    },
    [],
  );

  if (!myData) return null;

  return (
    <Card>
      <FormWrapper encType="multipart/form-data" onFinish={handleSubmit}>
        <div className="content">
          <div className="avatar">
            <Link href={GET_USER_URL(myData.id.toString())} passHref>
              <a href={PASS_HREF}>
                <Avatar>{myData.nickname?.[0]}</Avatar>
              </a>
            </Link>
          </div>
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
            {imageListPath.map((filePath) => (
              <div key={filePath} className="wrapper">
                <Image width={150} height={150} src={GET_IMAGE_URL(filePath, true)} alt={filePath} />
                <div className="button_wrapper">
                  <Button type="primary" danger onClick={handleRemoveImage(filePath)}>
                    제거
                  </Button>
                </div>
              </div>
            ))}
          </Image.PreviewGroup>
        </div>
      </FormWrapper>
    </Card>
  );
};

export default PostForm;
