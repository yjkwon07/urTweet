import { useCallback } from 'react';

import { Avatar, Button } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';
import { userAction, useReadMyUser } from '@modules/user';
import { removeUserId } from '@utils/auth';
import { GET_USER_URL, PASS_HREF } from '@utils/urls';

import { StyledCard, StyledCardMeta } from './styles';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { status: logoutStatus } = useAppSelector(fetchStatusSelector.byFetchAction(userAction.fetchLogout));
  const { data: myData } = useReadMyUser();

  const handleLogout = useCallback(() => {
    removeUserId();
    dispatch(userAction.fetchLogout.request());
  }, [dispatch]);

  if (!myData) return null;
  return (
    <StyledCard
      actions={[
        <div key="twit">
          게시글
          <br />
          {myData.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {myData.Followings.length}
        </div>,
        <div key="followers">
          팔로워
          <br />
          {myData.Followers.length}
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
