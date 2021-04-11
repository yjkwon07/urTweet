import React, { FC } from 'react';

import { Menu, Col } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { userSelector } from '@modules/user';
import { PASS_HREF, HOME_URL, PROFILE_URL } from '@utils/urls';

import LoginForm from './LoginForm';
import { MainWrapper, SearchInput } from './styles';
import UserProfile from './UserProfile';

const AppLayout: FC = ({ children }) => {
  const myData = useSelector(userSelector.myData);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href={HOME_URL} passHref>
            <a href={PASS_HREF}>HOME</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={PROFILE_URL} passHref>
            <a href={PASS_HREF}>PROFILE</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
      </Menu>
      <MainWrapper gutter={10}>
        <Col xs={24} md={4}>
          {myData ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={16}>
          {children}
        </Col>
        <Col xs={24} md={4} />
      </MainWrapper>
    </div>
  );
};

export default AppLayout;
