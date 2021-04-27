import React, { FC, useCallback, useState } from 'react';

import { Global } from '@emotion/react';
import { Menu, Col, Layout, Row } from 'antd';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { userSelector } from '@modules/user';
import { PASS_HREF, HOME_URL, PROFILE_URL, GET_HASHTAG_URL } from '@utils/urls';

import LoginForm from './LoginForm';
import { globalStyles, SearchInput } from './styles';
import UserProfile from './UserProfile';

const { Header, Content } = Layout;

const AppLayout: FC = ({ children }) => {
  const router = useRouter();
  const myData = useSelector(userSelector.myData);

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
              <a href={PASS_HREF}>노드버드</a>
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
            <Col xs={24} sm={24} md={8} lg={4} style={{ paddingTop: 12 }}>
              {myData ? <UserProfile /> : <LoginForm />}
            </Col>
            <Col xs={24} sm={24} md={16} lg={20} style={{ paddingTop: 12 }}>
              {children}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
