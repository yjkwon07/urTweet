import { useCallback, useRef } from 'react';

import { FileImageTwoTone } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Form, message, Image } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { fileUpload } from '@modules/file';
import imageDownload from '@modules/file/utils/imageDownloadLink';
import { postAction } from '@modules/post';
import { FormEditPost, Image as IImage } from '@modules/post/@types';
import { EDIT_POST_SCHEMA } from '@modules/post/config';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { StyledForm } from './styles';

export interface IProps {
  postId: number;
  postContent: string;
  imageList: IImage[];
  editMode?: boolean;
  onCancel: () => void;
}

const EditPostCardContent = ({ postId, postContent, imageList, onCancel }: IProps) => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(postAction.updatePost.TYPE, postId);

  const {
    control,
    register,
    watch,
    getValues,
    setValue,
    reset,
    handleSubmit: checkSubmit,
    formState: { errors },
  } = useForm<FormEditPost>({
    mode: 'onSubmit',
    resolver: yupResolver(EDIT_POST_SCHEMA),
    defaultValues: { content: postContent, image: imageList.map((image) => image.src) },
  });

  const previewImageList = watch('image');
  const imageInput = useRef<HTMLInputElement>(null);

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
        if (e.target.files && e.target.files.length) {
          const filePathList = await fileUpload(e.target.files);
          setValue('image', filePathList);
          if (imageInput.current) imageInput.current.value = '';
        }
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data.resMsg));
        }
      }
    },
    [setValue],
  );

  const handleRemoveImage = useCallback(
    (filePath: string) => () => {
      const prevImage = getValues('image');
      setValue(
        'image',
        prevImage?.filter((name) => name !== filePath),
      );
    },
    [getValues, setValue],
  );

  const handleChangePost = useCallback(
    async (formData) => {
      try {
        await dispatch(
          postAction.updatePost.asyncThunk(
            { url: { postId }, body: { content: formData.content, image: formData.image } },
            { actionList: [postId] },
          ),
        );
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data.resMsg));
        }
      } finally {
        reset({});
        onCancel();
      }
    },
    [dispatch, onCancel, postId, reset],
  );

  return (
    <StyledForm onSubmitCapture={checkSubmit(handleChangePost)}>
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
              maxLength={140}
              autoSize={{ minRows: 3, maxRows: 5 }}
              showCount
              value={value}
              onChange={onChange}
              placeholder="게시글을 작성해 주세요."
            />
          )}
        />
      </Form.Item>
      <div className="actions">
        <input type="hidden" {...register('image')} />
        <input type="file" multiple hidden ref={imageInput} onChange={handleChangeImage} />
        <Button className="file" shape="circle" onClick={handleClickImageUpload} icon={<FileImageTwoTone />} />
      </div>

      <div className="image_preview">
        <Image.PreviewGroup>
          {previewImageList?.map((filePath) => (
            <div key={filePath} className="wrapper">
              <Image width={150} height={150} src={imageDownload(filePath, true)} alt="" />
              <div className="button_wrapper">
                <Button type="primary" danger onClick={handleRemoveImage(filePath)}>
                  제거
                </Button>
              </div>
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
      <div className="btn-group">
        <Button className="submit-button mr-5" type="primary" htmlType="submit" loading={status === 'LOADING'}>
          수정
        </Button>
        <Button className="cancel-button" onClick={onCancel}>
          취소
        </Button>
      </div>
    </StyledForm>
  );
};

export default EditPostCardContent;
