import React, { FC } from 'react';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Col, Layout, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getUserId } from '@utils/auth';
import { PASS_HREF, HOME_URL, PROFILE_URL } from '@utils/urls';

import LoginForm from './organism/LoginForm';
import UserProfile from './organism/UserProfile';
import { StyledLayout } from './styles';

const { Content } = Layout;

interface IProps {
  filterGroup?: React.ReactNode;
}

const BaseLayout: FC<IProps> = ({ filterGroup, children }) => {
  const router = useRouter();

  return (
    <StyledLayout>
      <Content>
        <div style={{ height: 50 }} />
        <Row gutter={30}>
          <Col className="header" xs={24} sm={24} md={24} lg={8}>
            <div className="content">
              {getUserId() ? <UserProfile /> : <LoginForm />}
              <div className="blank" />
              <Menu className="menu" mode="vertical" defaultSelectedKeys={[router.pathname]}>
                <Menu.Item key={HOME_URL} className="menu-item">
                  <Link href={HOME_URL} passHref>
                    <a href={PASS_HREF}>
                      <HomeOutlined /> Home
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key={PROFILE_URL} className="menu-item">
                  <Link href={PROFILE_URL} passHref>
                    <a href={PASS_HREF}>
                      <UserOutlined /> 프로필
                    </a>
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
          </Col>
          {filterGroup ? (
            <>
              <Col xs={24} sm={24} md={24} lg={8}>
                {children}
              </Col>
              <Col className="filter" xs={24} sm={24} md={24} lg={8}>
                <div className="content">{filterGroup}</div>
              </Col>
            </>
          ) : (
            <Col xs={24} sm={24} md={24} lg={16}>
              {children}
            </Col>
          )}
        </Row>
      </Content>
    </StyledLayout>
  );
};

export default BaseLayout;
