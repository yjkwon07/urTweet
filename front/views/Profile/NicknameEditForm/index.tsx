import React, { useCallback, useState } from 'react';

import { Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { modifyNickname, userSelector } from '@modules/user';

import { FormWrapper } from './styles';

const NicknameEditForm = () => {
  const { status } = useFetchStatus(modifyNickname.TYPE);
  const myData = useSelector(userSelector.myData);
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');

  const handleChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      await dispatch(modifyNickname.asyncTunk({ nickname }));
      message.success('닉네임이 변경 되었습니다.');
    } catch (error) {
      message.error(JSON.stringify(error.response.data));
    }
  }, [dispatch, nickname]);

  return (
    <FormWrapper>
      <Form.Item name="nickname">
        <Input.Search
          name="nickname"
          placeholder={myData?.nickname}
          addonBefore="닉네임"
          enterButton="수정"
          value={nickname}
          onChange={handleChangeNickname}
          onSearch={handleSubmit}
          loading={status === 'LOADING'}
        />
      </Form.Item>
    </FormWrapper>
  );
};

export default NicknameEditForm;
