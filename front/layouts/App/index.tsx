import React, { FC } from 'react';

import { Menu, Row, Col } from 'antd';
import Link from 'next/link';

import LoginForm from './LoginForm';
import { SearchInput } from './styles';
import UserProfile from './UserProfile';

const dummy = {
  nickname: 'okok',
  Posts: [],
  Followings: [],
  Followers: [],
  isLoggedIn: false,
};

const AppLayout: FC = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>HOME</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>PROFILE</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>SIGNUP</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={10} style={{ marginTop: '10px' }}>
        <Col xs={24} md={4}>
          {/* {dummy.isLoggedIn ? <UserProfile /> : <LoginForm />} */}
        </Col>
        <Col xs={24} md={16}>
          {children}
        </Col>
        <Col xs={24} md={4} />
      </Row>
    </div>
  );
};

export default AppLayout;
