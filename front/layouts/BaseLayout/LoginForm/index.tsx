import { useCallback, useState } from 'react';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Input, Button, Form, message } from 'antd';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

import { LOGIN_SCHEMA, requestLogin, useReadMyUser } from '@modules/user';
import { FormLogin } from '@modules/user/@types';
import { setUserId } from '@utils/auth';
import isCustomAxiosError from '@utils/isCustomAxiosError';
import { PASS_HREF } from '@utils/urls';
import { SignupPageFilter } from '@views/Signup/utils';

import { StyledForm } from './styles';

const LoginForm = () => {
  const [isFetchLogin, setIsFetchLogin] = useState(false);
  const { mutate } = useReadMyUser();

  const {
    control,
    handleSubmit: checkSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  const handleSubmit = useCallback(
    async (formData: FormLogin) => {
      try {
        setIsFetchLogin(true);
        const {
          data: { resData },
        } = await requestLogin(formData);
        setUserId(resData.id.toString());
        await mutate(resData, false);
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data.resMsg));
        }
      } finally {
        setIsFetchLogin(false);
      }
    },
    [mutate],
  );

  return (
    <StyledForm onSubmitCapture={checkSubmit(handleSubmit)}>
      <Form.Item
        htmlFor="user_email"
        validateStatus={errors.email ? 'error' : 'success'}
        help={errors.email ? errors.email?.message : ''}
        rules={[{ message: errors.email?.message }]}
      >
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              id="user_email"
              type="email"
              placeholder="이메일"
              autoComplete="email"
              size="large"
              value={value}
              onChange={onChange}
              prefix={<MailOutlined />}
            />
          )}
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
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input.Password
              id="user_password"
              type="password"
              placeholder="비밀번호"
              autoComplete="current-password"
              size="large"
              value={value}
              onChange={onChange}
              prefix={<LockOutlined />}
            />
          )}
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
          loading={isFetchLogin}
        >
          <span>로그인</span>
        </Button>
        or{' '}
        <Link href={new SignupPageFilter().url} passHref>
          <a href={PASS_HREF}>register now!</a>
        </Link>
      </Form.Item>
    </StyledForm>
  );
};

export default LoginForm;
