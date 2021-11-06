import React, { FC } from 'react';

import { ArrowUpOutlined, ExperimentTwoTone, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Col, Layout, Row, BackTop } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PASS_HREF } from '@utils/urls';
import { PostListReadPageFilter } from '@views/Post/ListRead/utils';
import { ProfilePageFilter } from '@views/Profile/utils';

import { StyledLayout } from './styles';
import UserStatusView from './UserStatusView';

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
          <Link href={new PostListReadPageFilter().pathname} passHref>
            <a href={PASS_HREF}>
              <ExperimentTwoTone className="logo" /> <span className="title">UrTweet</span>
            </a>
          </Link>
        </div>
        <Row gutter={20}>
          <Col className="header-menu" xs={24} sm={24} md={8} lg={8}>
            <div className="content">
              <UserStatusView />
              <Menu className="menu mt-45" mode="vertical" defaultSelectedKeys={[router.pathname]}>
                <Menu.Item key={new PostListReadPageFilter().pathname} className="menu-item">
                  <Link href={new PostListReadPageFilter().pathname} passHref>
                    <a href={PASS_HREF}>
                      <HomeOutlined /> Home
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key={new ProfilePageFilter().url} className="menu-item">
                  <Link href={new ProfilePageFilter().url} passHref>
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
              <Col xs={24} sm={24} md={9} lg={9}>
                {children}
              </Col>
              <Col className="filter" xs={0} sm={0} md={7} lg={7}>
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
