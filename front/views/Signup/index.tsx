import { useCallback, useEffect } from 'react';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, Checkbox, Button, Typography, message } from 'antd';
import Router from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { signup, SIGNUP_SCHEMA, useReadMyUser } from '@modules/user';
import { FormSignup } from '@modules/user/@types';
import isCustomAxiosError from '@utils/isCustomAxiosError';
import { HOME_URL } from '@utils/urls';

import { StyledForm } from './styles';

const Signup = () => {
  const dispatch = useDispatch();
  const { status } = useFetchStatus(signup.TYPE);
  const { data: myData } = useReadMyUser();

  const {
    control,
    handleSubmit: checkSubmit,
    formState: { errors },
  } = useForm<FormSignup>({
    mode: 'onSubmit',
    resolver: yupResolver(SIGNUP_SCHEMA),
  });

  const handleSubmitCreateUser = useCallback(
    async (formData: FormSignup) => {
      try {
        await dispatch(signup.asyncThunk(formData));
        message.success('회원가입을 완료했습니다.');
        Router.push(HOME_URL);
      } catch (error) {
        if (isCustomAxiosError(error)) {
          message.error(JSON.stringify(error.response.data.resMsg));
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (myData) {
      message.error('로그인한 상태에서는 회원가입이 불가능합니다.');
      Router.replace(HOME_URL);
    }
  }, [myData]);

  return (
    <StyledForm onSubmitCapture={checkSubmit(handleSubmitCreateUser)}>
      <Typography.Title className="title">Signup</Typography.Title>
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
          render={() => <Input id="email" type="email" placeholder="User Email" prefix={<MailOutlined />} />}
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
          render={() => <Input id="nickname" placeholder="Nickname" prefix={<UserOutlined />} />}
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
          name="password"
          render={() => <Input id="password" type="password" placeholder="Password Check" prefix={<LockOutlined />} />}
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
          name="password-check"
          render={() => (
            <Input id="password-check" type="password" placeholder="Password Check" prefix={<LockOutlined />} />
          )}
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
            <Checkbox
              id="user-term"
              value={value}
              checked={value}
              onChange={() => onChange(!value)}
              defaultChecked={false}
            >
              약관에 동의 합니다.
            </Checkbox>
          )}
        />
      </Form.Item>
      <div className="btn-group">
        <Form.Item name="submit">
          <Button className="submit-button" type="primary" htmlType="submit" loading={status === 'LOADING'}>
            가입하기
          </Button>
        </Form.Item>
      </div>
    </StyledForm>
  );
};

export default Signup;
