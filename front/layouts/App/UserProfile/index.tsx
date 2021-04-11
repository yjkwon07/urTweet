import React, { useCallback, VFC } from 'react';

import { Card, Avatar, Button } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { requsetLogout, userSelector } from '@modules/user';
import { PASS_HREF } from '@utils/urls';

const UserProfile: VFC = () => {
  const dispatch = useDispatch();
  const myData = useSelector(userSelector.myData);
  console.log('myData :>> ', myData);
  const handleLogout = useCallback(() => {
    dispatch(requsetLogout.requset({}));
  }, [dispatch]);

  if (!myData) return null;
  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${myData.id}`} passHref>
            <a href={PASS_HREF}>
              게시글
              <br />
              {myData.Posts?.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile" passHref>
            <a href={PASS_HREF}>
              팔로잉
              <br />
              {myData.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile" passHref>
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
          <Link href={`/user/${myData.id}`} prefetch={false}>
            <Avatar>{myData.nickname[0]}</Avatar>
          </Link>
        }
        title={myData.nickname}
      />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
