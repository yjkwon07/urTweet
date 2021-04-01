import React, { useCallback, VFC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, Form } from 'antd';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ButtonWrapper, FormWrapper } from './styles';

const LOGIN_SCHEMA = yup.object({
  email: yup.string().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  password: yup
    .string()
    .required('비밀번호는 필수 입력입니다.')
    .matches(/[a-zA-Z]/gi, { message: '영문,숫자를 혼합하여 입력해야 합니다.' })
    .matches(/[0-9]/g, { message: '영문,숫자를 혼합하여 입력해야 합니다.' }),
});

type FormData = yup.InferType<typeof LOGIN_SCHEMA>;

const LoginForm: VFC = () => {
  const { control, handleSubmit: checkSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  const handleSubmit = useCallback(() => {
    return checkSubmit((formData) => {
      console.log('formData :>> ', formData);
    });
  }, [checkSubmit]);

  return (
    <FormWrapper onFinish={handleSubmit}>
      <Form.Item
        label="이메일"
        htmlFor="email"
        validateStatus={errors.email ? 'error' : 'success'}
        help={errors.email ? errors.email?.message : ''}
        rules={[{ message: errors?.email?.message }]}
      >
        <Controller control={control} as={Input} name="email" id="email" type="email" defaultValue="" />
      </Form.Item>
      <Form.Item
        label="비밀번호"
        htmlFor="password"
        validateStatus={errors.password ? 'error' : 'success'}
        help={errors.password ? errors.password?.message : ''}
        rules={[{ message: errors?.password?.message }]}
      >
        <Controller
          control={control}
          as={Input}
          name="password"
          id="password"
          type="password"
          autoComplete="current-password"
          defaultValue=""
        />
      </Form.Item>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
