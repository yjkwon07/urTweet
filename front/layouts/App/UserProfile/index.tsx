import React, { useCallback } from 'react';

import { LogoutOutlined } from '@ant-design/icons';
import { Card, Avatar, Button } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { logout, userSelector } from '@modules/user';
import { GET_USER_URL, PASS_HREF, PROFILE_URL } from '@utils/urls';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { status: logoutStatus } = useFetchStatus(logout.TYPE);
  const myData = useSelector(userSelector.myData);

  const handleLogout = useCallback(() => {
    dispatch(logout.requset());
  }, [dispatch]);

  if (!myData) return null;
  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={GET_USER_URL(myData.id.toString())} passHref>
            <a href={PASS_HREF}>
              게시글
              <br />
              {myData.Posts?.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href={PROFILE_URL} passHref>
            <a href={PASS_HREF}>
              팔로잉
              <br />
              {myData.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href={PROFILE_URL} passHref>
            <a href={PASS_HREF}>
              팔로워
              <br />
              {myData.Followers?.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={GET_USER_URL(myData.id.toString())}>
            <Avatar>{myData.nickname[0]}</Avatar>
          </Link>
        }
        title={myData.nickname}
      />
      <Button style={{ marginTop: 15 }} onClick={handleLogout} loading={logoutStatus === 'LOADING'}>
        <LogoutOutlined />
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
