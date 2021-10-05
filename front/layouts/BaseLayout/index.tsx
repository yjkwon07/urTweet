import React, { FC } from 'react';

import { ArrowUpOutlined, ExperimentTwoTone, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Col, Layout, Row, BackTop } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PASS_HREF, HOME_URL, PROFILE_URL } from '@utils/urls';

import UserStatusView from './organism/UserStatusView';
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
        <div className="header mb-50">
          <span>
            <ExperimentTwoTone className="logo" /> <span className="title">UrTweet</span>
          </span>
        </div>
        <Row gutter={30}>
          <Col className="header-menu" xs={24} sm={24} md={24} lg={8}>
            <div className="content">
              <UserStatusView />
              <Menu className="menu mt-45" mode="vertical" defaultSelectedKeys={[router.pathname]}>
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
              <Col xs={24} sm={24} md={24} lg={9}>
                {children}
              </Col>
              <Col className="filter" xs={24} sm={24} md={24} lg={7}>
                <div className="content">{filterGroup}</div>
              </Col>
            </>
          ) : (
            <Col xs={24} sm={24} md={24} lg={14}>
              {children}
            </Col>
          )}
        </Row>
        <BackTop>
          <div className="scroll-up">
            <ArrowUpOutlined />
          </div>
        </BackTop>
      </Content>
    </StyledLayout>
  );
};

export default BaseLayout;
