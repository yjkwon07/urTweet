import { useCallback, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { updateNickname, NICKNAME_SCHEMA, useReadMyUser } from '@modules/user';
import { FormNickname } from '@modules/user/@types';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { FormWrapper } from './styles';

const EditNickNameForm = () => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(updateNickname.TYPE);
  const { data: myData } = useReadMyUser();

  const {
    control,
    handleSubmit: checkSubmit,
    formState: { errors },
    reset,
  } = useForm<FormNickname>({
    mode: 'onSubmit',
    resolver: yupResolver(NICKNAME_SCHEMA),
  });

  useEffect(() => {
    if (myData) {
      reset({
        nickname: myData.nickname,
      });
    }
  }, [myData, reset]);

  const handleSubmitUpdateNickname = useCallback(
    async (formData: FormNickname) => {
      if (!myData?.id) return;
      try {
        await dispatch(updateNickname.asyncThunk({ nickname: formData.nickname }));
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data));
        }
      }
    },
    [myData?.id, dispatch],
  );

  return (
    <FormWrapper>
      <Form.Item
        htmlFor="nickname"
        validateStatus={errors.nickname ? 'error' : 'success'}
        help={errors.nickname ? errors.nickname?.message : ''}
        rules={[{ message: errors?.nickname?.message }]}
      >
        <Controller
          control={control}
          name="nickname"
          render={({ field: { value, onChange } }) => (
            <Input.Search
              id="nickname"
              value={value}
              onChange={onChange}
              addonBefore="닉네임"
              enterButton="수정"
              onSearch={() => checkSubmit(handleSubmitUpdateNickname)()}
              placeholder="닉네임을 입력해 주세요."
              loading={status === 'LOADING'}
            />
          )}
        />
      </Form.Item>
    </FormWrapper>
  );
};

export default EditNickNameForm;
