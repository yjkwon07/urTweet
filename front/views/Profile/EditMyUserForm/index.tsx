import { useCallback, useEffect } from 'react';

import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { NICKNAME_SCHEMA, useReadMyUser, userAction } from '@modules/user';
import { FormNickname } from '@modules/user/@types';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { StyledForm } from './styles';

const EditMyUserForm = () => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(userAction.updateMyUser.TYPE);
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
        email: myData.email,
        nickname: myData.nickname,
      });
    }
  }, [myData, reset]);

  const handleSubmitUpdateNickname = useCallback(
    async (formData: FormNickname) => {
      if (!myData?.id) return;
      try {
        await dispatch(userAction.updateMyUser.asyncThunk(formData));
        message.success('수정 되었습니다.');
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data));
        }
      }
    },
    [myData?.id, dispatch],
  );

  return (
    <StyledForm onSubmitCapture={checkSubmit(handleSubmitUpdateNickname)}>
      <Form.Item
        label="이메일"
        htmlFor="email"
        validateStatus={errors.email ? 'error' : 'success'}
        help={errors.email ? errors.email?.message : ''}
        rules={[{ message: errors?.email?.message }]}
      >
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              id="email"
              type="email"
              placeholder="User Email"
              prefix={<MailOutlined />}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        label="닉네임"
        htmlFor="nickname"
        validateStatus={errors.nickname ? 'error' : 'success'}
        help={errors.nickname ? errors.nickname?.message : ''}
        rules={[{ message: errors?.nickname?.message }]}
      >
        <Controller
          control={control}
          name="nickname"
          render={({ field: { value, onChange } }) => (
            <Input id="nickname" value={value} onChange={onChange} prefix={<UserOutlined />} />
          )}
        />
      </Form.Item>
      <div className="btn-group">
        <Form.Item name="submit">
          <Button className="submit-button" type="primary" htmlType="submit" loading={status === 'LOADING'}>
            수정하기
          </Button>
        </Form.Item>
      </div>
    </StyledForm>
  );
};

export default EditMyUserForm;
