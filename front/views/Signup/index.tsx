import React, { useEffect, useMemo } from 'react';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, Checkbox, Button, Typography, message } from 'antd';
import Router from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { signup, SIGNUP_SCHEMA, userSelector } from '@modules/user';
import { FormSignup } from '@modules/user/@types';
import isCustomAxiosError from '@utils/isCustomAxiosError';
import { HOME_URL } from '@utils/urls';

import { FormWrapper } from './styles';

const Signup = () => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(signup.TYPE);
  const myData = useSelector(userSelector.myData);

  const {
    control,
    handleSubmit: checkSubmit,
    formState: { errors },
  } = useForm<FormSignup>({
    mode: 'onChange',
    resolver: yupResolver(SIGNUP_SCHEMA),
  });

  const handleSubmit = useMemo(() => {
    return checkSubmit(async (formData) => {
      try {
        await dispatch(signup.asyncThunk(formData));
        message.success('회원가입을 완료했습니다.');
        Router.push(HOME_URL);
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data.resMsg));
        }
      }
    });
  }, [checkSubmit, dispatch]);

  useEffect(() => {
    if (myData) {
      message.error('로그인한 상태에서는 회원가입이 불가능합니다.');
      Router.replace(HOME_URL);
    }
  }, [myData]);

  return (
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
          render={() => <Input id="email" type="email" placeholder="User Email" prefix={<MailOutlined />} />}
          name="email"
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
          render={() => <Input id="nickname" placeholder="Nickname" prefix={<UserOutlined />} />}
          name="nickname"
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
          render={() => <Input id="password" type="password" placeholder="Password Check" prefix={<LockOutlined />} />}
          name="password"
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
          render={() => (
            <Input id="password-check" type="password" placeholder="Password Check" prefix={<LockOutlined />} />
          )}
          name="password-check"
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
          name="user-term"
          render={({ field: { value, onChange } }) => (
            <Checkbox id="user-term" onChange={() => onChange(!value)} checked={value} value={value}>
              약관에 동의 합니다.
            </Checkbox>
          )}
          defaultValue={false}
        />
      </Form.Item>
      <Form.Item name="submit">
        <Button type="primary" htmlType="submit" loading={status === 'LOADING'}>
          가입하기
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default Signup;
