import { useCallback, useState } from 'react';

import { Avatar, Button, message } from 'antd';
import Link from 'next/link';

import { requestLogout, useReadMyUser } from '@modules/user';
import { removeUserId } from '@utils/auth';
import isCustomAxiosError from '@utils/isCustomAxiosError';
import { PASS_HREF } from '@utils/urls';
import { UserReadPageFilter } from '@views/User/Read/utils';

import { StyledCard, StyledCardMeta } from './styles';

const UserProfile = () => {
  const [isFetchLogout, setIsFetchLogout] = useState(false);
  const { data: myData, mutate } = useReadMyUser();

  const handleLogout = useCallback(async () => {
    try {
      setIsFetchLogout(true);
      removeUserId();
      await requestLogout();
      await mutate(null, false);
    } catch (error) {
      if (isCustomAxiosError(error)) {
        message.error(JSON.stringify(error.response.data.resMsg));
      }
    } finally {
      setIsFetchLogout(false);
    }
  }, [mutate]);

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
          <Link href={new UserReadPageFilter({ id: myData.id }, { userId: myData.id }).url} passHref>
            <a href={PASS_HREF}>
              <Avatar>{myData.nickname?.[0]}</Avatar>
            </a>
          </Link>
        }
        title={
          <div className="title">
            {myData.nickname}
            <Button className="logout-button" shape="round" onClick={handleLogout} loading={isFetchLogout}>
              <span>로그아웃</span>
            </Button>
          </div>
        }
      />
    </StyledCard>
  );
};

export default UserProfile;
