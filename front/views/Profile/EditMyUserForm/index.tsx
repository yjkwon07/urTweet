import { useCallback, useEffect, useState } from 'react';

import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button, Form, Input, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { requestUpdateMyUser, UPDATE_MY_USER_SCHEMA, useReadMyUser } from '@modules/user';
import { FormUpdateMyUser } from '@modules/user/@types';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { StyledForm } from './styles';

const EditMyUserForm = () => {
  const [isFetchUpdateMyUser, setIsFetchUpdateMyUser] = useState(false);
  const { data: myData, mutate } = useReadMyUser();

  const {
    control,
    handleSubmit: checkSubmit,
    formState: { errors },
    reset,
  } = useForm<FormUpdateMyUser>({
    mode: 'onSubmit',
    resolver: yupResolver(UPDATE_MY_USER_SCHEMA),
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
    async (formData: FormUpdateMyUser) => {
      if (!myData?.id) return;
      try {
        setIsFetchUpdateMyUser(true);
        await requestUpdateMyUser(formData);
        message.success('수정 되었습니다.');
        mutate();
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data));
        }
      } finally {
        setIsFetchUpdateMyUser(false);
      }
    },
    [mutate, myData?.id],
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
          <Button className="submit-button" type="primary" htmlType="submit" loading={isFetchUpdateMyUser}>
            수정하기
          </Button>
        </Form.Item>
      </div>
    </StyledForm>
  );
};

export default EditMyUserForm;
