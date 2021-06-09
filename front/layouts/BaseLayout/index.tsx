import React, { FC, useCallback, useState } from 'react';

import { Global } from '@emotion/react';
import { Menu, Col, Layout, Row } from 'antd';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { useMyUser } from '@modules/user';
import { PASS_HREF, HOME_URL, PROFILE_URL, GET_HASHTAG_URL } from '@utils/urls';

import LoginForm from './organism/LoginForm';
import UserProfile from './organism/UserProfile';
import { globalStyles, SearchInput } from './styles';

const { Header, Content } = Layout;

const BaseLayout: FC = ({ children }) => {
  const router = useRouter();
  const { data: myData } = useMyUser({});

  const [searchInput, setSearchInput] = useState('');

  const handleChangeSearchInput = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    Router.push(GET_HASHTAG_URL(searchInput));
  }, [searchInput]);

  return (
    <Layout className="layout">
      <Global styles={globalStyles} />
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#FFF' }}>
        <Menu mode="horizontal" defaultSelectedKeys={[router.pathname]}>
          <Menu.Item key={HOME_URL}>
            <Link href={HOME_URL} passHref>
              <a href={PASS_HREF}>urTweet</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={PROFILE_URL}>
            <Link href={PROFILE_URL} passHref>
              <a href={PASS_HREF}>프로필</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/search">
            <SearchInput enterButton value={searchInput} onChange={handleChangeSearchInput} onSearch={handleSearch} />
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64, backgroundColor: '#FFF' }}>
        <div style={{ minHeight: 400, padding: 24 }}>
          <Row gutter={12}>
            <Col xs={24} sm={24} md={24} lg={8} style={{ paddingTop: 12 }}>
              {myData ? <UserProfile /> : <LoginForm />}
            </Col>
            <Col xs={24} sm={24} md={24} lg={9} style={{ paddingTop: 12 }}>
              {children}
            </Col>
            <Col xs={24} sm={24} md={24} lg={7} style={{ paddingTop: 12 }} />
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default BaseLayout;
