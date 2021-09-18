import React, { useCallback } from 'react';

import { Avatar, Button } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { StyledCard } from '@components/PostCard/styles';
import { useFetchStatus } from '@modules/fetchStatus';
import { logout, useMyUser } from '@modules/user';
import { removeUserId } from '@utils/auth';
import { GET_USER_URL, PASS_HREF, PROFILE_URL } from '@utils/urls';

import { StyledCardMeta } from './styles';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { status: logoutStatus } = useFetchStatus(logout.TYPE);
  const { data: myData } = useMyUser();

  const handleLogout = useCallback(() => {
    removeUserId();
    dispatch(logout.request({}));
  }, [dispatch]);

  if (!myData) return null;
  return (
    <StyledCard
      actions={[
        <div key="twit">
          <Link href={GET_USER_URL(myData.id.toString())} passHref>
            <a href={PASS_HREF}>
              게시글
              <br />
              {myData.Posts.length}
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
        <div key="followers">
          <Link href={PROFILE_URL} passHref>
            <a href={PASS_HREF}>
              팔로워
              <br />
              {myData.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <StyledCardMeta
        avatar={
          <Link href={GET_USER_URL(myData.id.toString())} passHref>
            <a href={PASS_HREF}>
              <Avatar>{myData.nickname?.[0]}</Avatar>
            </a>
          </Link>
        }
        title={
          <div className="title">
            {myData.nickname}
            <Button className="logout-button" shape="round" onClick={handleLogout} loading={logoutStatus === 'LOADING'}>
              <span>로그아웃</span>
            </Button>
          </div>
        }
      />
    </StyledCard>
  );
};

export default UserProfile;
