import React, { useEffect, useMemo, VFC } from 'react';

import { LockOutlined, LoginOutlined, MailOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, Form, message } from 'antd';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { useFetchStatus } from '@modules/fetchStatus';
import { requsetLogin } from '@modules/user';
import { PASS_HREF, SIGNUP_URL } from '@utils/urls';

import { FormWrapper } from './styles';

const LOGIN_SCHEMA = yup.object({
  email: yup.string().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  password: yup.string().required('비밀번호는 필수 입력입니다.'),
});

type FormData = yup.InferType<typeof LOGIN_SCHEMA>;

const LoginForm: VFC = () => {
  const { status, data } = useFetchStatus(requsetLogin.TYPE);
  const dispatch = useDispatch();
  const { control, handleSubmit: checkSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  useEffect(() => {
    if (status === 'FAIL') {
      message.error(JSON.stringify(data.response.data));
    }
  }, [data, status]);

  const handleSubmit = useMemo(() => {
    return checkSubmit((formData) => {
      dispatch(requsetLogin.requset(formData));
    });
  }, [checkSubmit, dispatch]);

  return (
    <FormWrapper onFinish={() => handleSubmit()}>
      <Form.Item
        label="이메일"
        htmlFor="user_email"
        validateStatus={errors.email ? 'error' : 'success'}
        help={errors.email ? errors.email?.message : ''}
        rules={[{ message: errors.email?.message }]}
      >
        <Controller
          control={control}
          as={<Input prefix={<MailOutlined />} />}
          name="email"
          id="user_email"
          type="email"
          placeholder="User Email"
          defaultValue=""
        />
      </Form.Item>
      <Form.Item
        label="비밀번호"
        htmlFor="user_password"
        validateStatus={errors.password ? 'error' : 'success'}
        help={errors.password ? errors.password?.message : ''}
        rules={[{ message: errors.password?.message }]}
      >
        <Controller
          control={control}
          as={<Input.Password prefix={<LockOutlined />} />}
          name="password"
          id="user_password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          defaultValue=""
        />
      </Form.Item>
      <Form.Item name="submit">
        <Button block type="primary" htmlType="submit" loading={status === 'LOADING'}>
          <LoginOutlined /> Log in
        </Button>
        Or{' '}
        <Link href={SIGNUP_URL} passHref>
          <a href={PASS_HREF}>register now!</a>
        </Link>
      </Form.Item>
    </FormWrapper>
  );
};

export default LoginForm;
