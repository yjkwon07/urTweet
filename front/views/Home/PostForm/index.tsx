import React, { useCallback, useMemo, useRef, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Space, Form, Input, message } from 'antd';
import { debounce } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { createPost, uploadImages } from '@modules/post';
import { IUploadImagePathRes } from '@modules/post/@types/query';
import { GET_IMAGE_URL } from '@utils/urls';

const POST_SCHEMA = yup.object({
  content: yup.string().min(3, '게시글은 3자 이상 입력하여 주십시오.').required('게시글은 필수 입력 항목 입니다.'),
});

type FormData = yup.InferType<typeof POST_SCHEMA>;

const PostForm = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit: checkSubmit, errors, reset } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(POST_SCHEMA),
    defaultValues: { content: '' },
  });

  const [imageListPath, setImageListPath] = useState<IUploadImagePathRes>([]);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleSubmit = useMemo(() => {
    return debounce(
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
      }),
      300,
    );
  }, [checkSubmit, dispatch, imageListPath, reset]);

  const handleClickImageUpload = useCallback(() => {
    if (imageInput.current) imageInput.current.click();
  }, []);

  const handleChangeImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (file) => {
          imageFormData.append('image', file);
        });
        const listPath = await dispatch(uploadImages.asyncTunk(imageFormData));
        setImageListPath(listPath);
      } catch (error) {
        message.error(JSON.stringify(error.response.data)).then();
      }
    },
    [dispatch],
  );

  const handleRemoveImage = useCallback(
    (fileName) => () => {
      setImageListPath((data) => data.filter((name) => name !== fileName));
    },
    [],
  );

  return (
    <Form style={{ marginBottom: 45 }} encType="multipart/form-data" onFinish={handleSubmit}>
      <Form.Item
        name="content"
        validateStatus={errors.content ? 'error' : 'success'}
        help={errors.content ? errors.content?.message : ''}
        rules={[{ message: errors?.content?.message }]}
      >
        <Controller
          control={control}
          as={<Input.TextArea maxLength={140} autoSize={{ minRows: 3, maxRows: 5 }} defaultValue="" />}
          name="content"
          id="content"
          placeholder="게시글을 작성해 주세요."
        />
      </Form.Item>
      <div style={{ position: 'relative', margin: 0 }}>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={handleChangeImage} />
        <Button style={{ position: 'absolute', right: 80, bottom: '-15px' }} onClick={handleClickImageUpload}>
          <UploadOutlined /> Images Upload
        </Button>
        <Button type="primary" htmlType="submit" style={{ position: 'absolute', right: 0, bottom: '-15px' }}>
          올리기
        </Button>
      </div>
      <Space size={8}>
        {imageListPath.map((fileName) => (
          <div key={fileName} style={{ margin: '5px 0 5px 0' }}>
            <img src={GET_IMAGE_URL(fileName)} alt={fileName} />
            <div style={{ marginTop: '5px' }}>
              <Button type="dashed" onClick={handleRemoveImage(fileName)}>
                제거
              </Button>
            </div>
          </div>
        ))}
      </Space>
    </Form>
  );
};

export default PostForm;
