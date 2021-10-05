import { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { useFetchStatus } from '@modules/fetchStatus';
import { modifyNickname, userSelector } from '@modules/user';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { FormWrapper } from './styles';

const NICKNAME_SCHEMA = yup.object({
  nickname: yup.string().required('닉네임은 필수 입력 항목 입니다.'),
});

type FormData = yup.InferType<typeof NICKNAME_SCHEMA>;

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(modifyNickname.TYPE);
  const myData = useSelector(userSelector.myData);
  const {
    control,
    handleSubmit: checkSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(NICKNAME_SCHEMA),
  });

  const handleSubmit = useCallback(() => {
    checkSubmit(async (formData) => {
      if (!myData?.id) return;
      try {
        reset();
        await dispatch(modifyNickname.asyncThunk({ nickname: formData.nickname }));
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data));
        }
      }
    })();
  }, [checkSubmit, myData?.id, reset, dispatch]);

  return (
    <FormWrapper>
      <Form.Item
        validateStatus={errors.nickname ? 'error' : 'success'}
        help={errors.nickname ? errors.nickname?.message : ''}
        rules={[{ message: errors?.nickname?.message }]}
      >
        <Controller
          control={control}
          name="nickname"
          render={() => (
            <Input.Search
              id="nickname"
              addonBefore="닉네임"
              enterButton="수정"
              onSearch={handleSubmit}
              placeholder={myData?.nickname}
              loading={status === 'LOADING'}
            />
          )}
        />
      </Form.Item>
    </FormWrapper>
  );
};

export default NicknameEditForm;
