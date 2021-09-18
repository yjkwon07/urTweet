import React, { useCallback } from 'react';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, Form, message } from 'antd';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { login, LOGIN_SCHEMA } from '@modules/user';
import { FormLogin } from '@modules/user/@types';
import { setUserId } from '@utils/auth';
import isCustomAxiosError from '@utils/isCustomAxiosError';
import { PASS_HREF, SIGNUP_URL } from '@utils/urls';

import { FormWrapper } from './styles';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(login.TYPE);

  const {
    control,
    handleSubmit: checkSubmit,
    errors,
  } = useForm<FormLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        const user = await dispatch(login.asyncThunk(formData));
        setUserId(user.id.toString());
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data));
        }
      }
    },
    [dispatch],
  );

  return (
    <FormWrapper onSubmitCapture={checkSubmit(handleSubmit)}>
      <Form.Item
        htmlFor="user_email"
        validateStatus={errors.email ? 'error' : 'success'}
        help={errors.email ? errors.email?.message : ''}
        rules={[{ message: errors.email?.message }]}
      >
        <Controller
          control={control}
          as={<Input prefix={<MailOutlined />} size="large" />}
          name="email"
          id="user_email"
          type="email"
          placeholder="이메일"
          autoComplete="email"
        />
      </Form.Item>
      <Form.Item
        htmlFor="user_password"
        validateStatus={errors.password ? 'error' : 'success'}
        help={errors.password ? errors.password?.message : ''}
        rules={[{ message: errors.password?.message }]}
      >
        <Controller
          control={control}
          as={<Input.Password prefix={<LockOutlined />} size="large" />}
          name="password"
          id="user_password"
          type="password"
          placeholder="비밀번호"
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          className="login-button"
          block
          size="large"
          shape="round"
          type="primary"
          htmlType="submit"
          loading={status === 'LOADING'}
        >
          <span>로그인</span>
        </Button>
        or{' '}
        <Link href={SIGNUP_URL} passHref>
          <a href={PASS_HREF}>register now!</a>
        </Link>
      </Form.Item>
    </FormWrapper>
  );
};

export default LoginForm;
