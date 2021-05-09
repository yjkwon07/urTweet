import React, { useEffect, useMemo, VFC } from 'react';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, Checkbox, Button, Typography, message } from 'antd';
import Head from 'next/head';
import Router from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import AppLayout from '@layouts/App';
import { useFetchStatus } from '@modules/fetchStatus';
import { signup, userSelector } from '@modules/user';
import { HOME_URL } from '@utils/urls';

import { FormWrapper } from './styles';

const SIGNUP_SCHEMA = yup.object({
  email: yup.string().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  nickname: yup.string().required('닉네임은 필수 입력입니다.'),
  password: yup
    .string()
    .required('비밀번호는 필수 입력입니다.')
    .matches(/[a-zA-Z]/gi, { message: '영문,숫자를 혼합하여 입력해야 합니다.' })
    .matches(/[0-9]/g, { message: '영문,숫자를 혼합하여 입력해야 합니다.' }),
  'password-check': yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력입니다.'),
  'user-term': yup.boolean().oneOf([true], '이용약관 동의가 필요 합니다.'),
});

type FormData = yup.InferType<typeof SIGNUP_SCHEMA>;

const Signup: VFC = () => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(signup.TYPE);
  const myData = useSelector(userSelector.myData);
  const { control, handleSubmit: checkSubmit, errors } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(SIGNUP_SCHEMA),
  });

  const handleSubmit = useMemo(() => {
    return checkSubmit(async (formData) => {
      try {
        await dispatch(signup.asyncTunk(formData));
        message.success('회원가입에 성공하셨습니다.').then(() => Router.push(HOME_URL));
      } catch (error) {
        message.error(JSON.stringify(error.response.data)).then();
      }
    });
  }, [checkSubmit, dispatch]);

  useEffect(() => {
    if (myData && myData.id) {
      message.error('로그인한 상태에서는 회원가입이 불가능합니다.').then(() => Router.push(HOME_URL));
    }
  }, [myData]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | urTweet</title>
      </Head>

      <FormWrapper onFinish={() => handleSubmit()}>
        <Typography.Title>Signup</Typography.Title>
        <Form.Item
          label="이메일"
          htmlFor="email"
          validateStatus={errors.email ? 'error' : 'success'}
          help={errors.email ? errors.email?.message : ''}
          rules={[{ message: errors?.email?.message }]}
        >
          <Controller
            control={control}
            as={<Input prefix={<MailOutlined />} />}
            name="email"
            id="email"
            type="email"
            placeholder="User Email"
            defaultValue=""
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
            as={<Input prefix={<UserOutlined />} />}
            name="nickname"
            id="nickname"
            placeholder="Nickname"
            defaultValue=""
          />
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
            as={<Input prefix={<LockOutlined />} />}
            name="password"
            type="password"
            id="password"
            placeholder="Password Check"
            defaultValue=""
          />
        </Form.Item>
        <Form.Item
          label="비밀번호체크"
          htmlFor="password-check"
          validateStatus={errors['password-check'] ? 'error' : 'success'}
          help={errors['password-check'] ? errors['password-check']?.message : ''}
          rules={[{ message: errors['password-check']?.message }]}
        >
          <Controller
            control={control}
            as={<Input prefix={<LockOutlined />} />}
            name="password-check"
            type="password"
            id="password-check"
            placeholder="Password Check"
            defaultValue=""
          />
        </Form.Item>
        <Form.Item
          label="약관 동의"
          htmlFor="user-term"
          validateStatus={errors['user-term'] ? 'error' : 'success'}
          help={errors['user-term'] ? errors['user-term']?.message : ''}
          rules={[{ message: errors['user-term']?.message }]}
        >
          <Controller
            control={control}
            render={({ value, onChange }) => (
              <Checkbox onChange={() => onChange(!value)} checked={value} value={value}>
                약관에 동의 합니다.
              </Checkbox>
            )}
            name="user-term"
            id="user-term"
            defaultValue={false}
          />
        </Form.Item>
        <Form.Item name="submit">
          <Button type="primary" htmlType="submit" loading={status === 'LOADING'}>
            가입하기
          </Button>
        </Form.Item>
      </FormWrapper>
    </AppLayout>
  );
};

export default Signup;
